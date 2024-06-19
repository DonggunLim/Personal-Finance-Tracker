import { Record, formatPriceToCurrency } from "@/utilities/common";
import { useState } from "react";
import CloseIcon from "./Icons/CloseIcon";
import { LiaEdit } from "react-icons/lia";
import Popover from "./UI/Popover";
import { FormData } from "./ExpenseFormModal";
import ExpenseFormModal from "./ExpenseFormModal";
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
      className={`box group relative mb-2 flex justify-between hover:bg-slate-500 ${
        isPopoverShown && "bg-slate-500"
      }`}
      onMouseOver={() => setIsFocused(true)}
      onMouseLeave={() => {
        if (!isPopoverShown) setIsFocused(false);
      }}
    >
      <div className="py-2 pl-4">
        <p
          className={`text-xs font-medium group-hover:text-white ${
            isPopoverShown && "text-white"
          }`}
        >
          {description}
        </p>
        <div className="mt-2 flex gap-2">
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
          className="absolute right-3 top-0 cursor-pointer text-xl font-bold text-white hover:scale-125"
          onClick={hadlePopoverClick}
        >
          ...
        </button>
      )}
      {isPopoverShown && (
        <Popover
          className="absolute right-0 top-9 z-50"
          onClose={onClosePopover}
        >
          <div className="flex w-36 flex-col items-center rounded-md bg-white p-1 text-xs font-extrabold">
            <button
              onClick={handleClickEdit}
              className="group/edit flex w-full cursor-pointer items-center rounded-md p-1 hover:bg-purple-100"
            >
              <span className="group-hover/edit:text-purple-700">
                <LiaEdit className="h-5 w-5" />
              </span>
              수정
            </button>
            <button
              onClick={handleClickDelete}
              className="group/delete flex w-full cursor-pointer items-center rounded-md p-1 hover:bg-red-100"
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
          <section className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900/30 backdrop-blur-sm">
            <div className="relative rounded-md bg-white p-8">
              <CloseIcon
                className="absolute right-1 top-1 cursor-pointer"
                onClose={() => setIsDeleted(false)}
              />
              <div className="flex w-72 flex-col items-center gap-y-4">
                <p className="text-lg font-semibold text-gray-500">
                  기록을 삭제하시겠습니까?
                </p>
                <button
                  className="w-20 rounded-md bg-purple-400 px-2 py-1 text-xs font-semibold text-white"
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
