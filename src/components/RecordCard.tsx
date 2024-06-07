import { Record, formatPriceToCurrency } from "@/utilities/common";
import { useState } from "react";
import CloseIcon from "./Icons/CloseIcon";
import { LiaEdit } from "react-icons/lia";
import Popover from "./UI/Popover";
import ExpenseFormModal, { FormData } from "./ExpenseFormModal";
import CommonModal from "./common/CommonModal";
import { RecordActionType } from "@/hooks/useRecords";
import { useToast } from "@/hooks/useToast";
import { paymentItems, tagItems } from "@/data/data";

type Props = {
  record: Record;
  manageRecord: (record: Record, action: RecordActionType) => void;
};

export default function RecordCard({ record, manageRecord }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverShown, setIsPopoverShown] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { price, description, paymentMethod, tag } = record;
  const payment_icon = paymentItems.filter((i) => i.title == paymentMethod)[0]
    .icon;
  const tag_icon = tagItems.filter((i) => i.title == tag)[0].icon;
  const toast = useToast();
  const hadlePopoverClick = () => setIsPopoverShown(!isPopoverShown);
  const handleClickEdit = () => {
    setIsPopoverShown(false);
    setIsEdited(true);
  };
  const handleClickDelete = () => {
    setIsPopoverShown(false);
    setIsDeleted(true);
  };
  const onClosePopover = () => {
    setIsFocused(false);
    setIsPopoverShown(false);
  };
  const handleDeleteSubmit = () => {
    fetch("/api/records", {
      method: "DELETE",
      body: JSON.stringify({ id: record._id }),
    }) //
      .then((res) => {
        if (res.ok) {
          manageRecord(record, "delete");
          toast.success("기록을 삭제 하였습니다.");
        } else {
          throw new Error(`서버에서 응답이 올바르지 않습니다.`);
        }
      })
      .catch((error) => {
        console.error(error);
        manageRecord(record, "add");
        toast.error(`${error.message}`);
      })
      .finally(() => {
        setIsDeleted(false);
        onClosePopover();
      });
  };
  const handleEditSubmit = (formData: FormData) => {
    const prevRecord = record;
    fetch("/api/records", {
      method: "PUT",
      body: JSON.stringify(formData),
    }) //
      .then((res) => {
        if (res.ok) {
          manageRecord(formData, "update");
          toast.success("기록을 수정 하였습니다.");
        } else {
          throw new Error(`서버에서 응답이 올바르지 않습니다.`);
        }
      })
      .catch((error) => {
        console.error(error);
        manageRecord(formData, "delete");
        manageRecord(prevRecord, "add");
        toast.error(`${error.message}`);
      })
      .finally(() => {
        setIsEdited(false);
        onClosePopover();
      });
  };

  return (
    <div
      className={`relative group box flex justify-between mb-2 hover:bg-slate-500 ${
        isPopoverShown && "bg-slate-500"
      }`}
      onMouseOver={() => setIsFocused(true)}
      onMouseLeave={() => {
        if (!isPopoverShown) setIsFocused(false);
      }}
    >
      <div className="pl-4 py-2">
        <p
          className={`text-xs font-medium group-hover:text-white ${
            isPopoverShown && "text-white"
          }`}
        >
          {description}
        </p>
        <div className="flex gap-2 mt-2">
          <p className="input">
            <span>{payment_icon}</span>
            {paymentMethod}
          </p>
          <p className="input">
            <span>{tag_icon}</span>
            {tag}
          </p>
        </div>
      </div>
      <div
        className={`flex items-end text-xl font-bold group-hover:text-white ${
          isPopoverShown && "text-white"
        }`}
      >
        <p>{formatPriceToCurrency(price)}원</p>
      </div>
      {isFocused && (
        <button
          className="absolute top-0 right-3 text-xl font-bold text-white hover:scale-125 cursor-pointer"
          onClick={hadlePopoverClick}
        >
          ...
        </button>
      )}
      {isPopoverShown && (
        <Popover
          className="absolute top-9 right-0 z-50"
          onClose={onClosePopover}
        >
          <div className="w-36 bg-white text-xs font-extrabold flex flex-col items-center p-1 rounded-md">
            <button
              onClick={handleClickEdit}
              className="group/edit w-full flex items-center hover:bg-purple-100 p-1 rounded-md cursor-pointer"
            >
              <span className="group-hover/edit:text-purple-700">
                <LiaEdit className="w-5 h-5" />
              </span>
              수정
            </button>
            <button
              onClick={handleClickDelete}
              className="group/delete w-full flex items-center hover:bg-red-100 p-1 rounded-md cursor-pointer"
            >
              <CloseIcon className="group-hover/delete:text-red-700" />
              삭제
            </button>
          </div>
        </Popover>
      )}
      {isEdited && (
        <ExpenseFormModal
          onClose={() => setIsEdited(false)}
          initialFormData={record}
          onSubmit={handleEditSubmit}
        />
      )}
      {isDeleted && (
        <CommonModal>
          <section
            className="fixed top-0 left-0 w-full h-full bg-gray-900/30 backdrop-blur-sm 
          flex justify-center items-center"
          >
            <div className="bg-white rounded-md p-8 relative">
              <CloseIcon
                className="absolute top-1 right-1 cursor-pointer"
                onClose={() => setIsDeleted(false)}
              />
              <div className="w-72 flex flex-col items-center gap-y-4">
                <p className="font-semibold text-lg text-gray-500">
                  기록을 삭제하시겠습니까?
                </p>
                <button
                  className="w-20 text-xs text-white font-semibold bg-purple-400 rounded-md px-2 py-1"
                  onClick={handleDeleteSubmit}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </section>
        </CommonModal>
      )}
    </div>
  );
}
