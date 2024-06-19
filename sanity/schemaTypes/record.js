export default {
  title: 'Record',
  name: 'record',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'string',
    },
    {
      title: 'PaymentMethod',
      name: 'paymentMethod',
      type: 'string',
    },
    {
      title: 'Tag',
      name: 'tag',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Installment',
      name: 'installment',
      type: 'string',
    },
    {
      title: 'Installment Details',
      name: 'installmentDetails',
      type: 'object',
      fields: [
        {
          title: 'Is Installment',
          name: 'isInstallment',
          type: 'boolean',
        },
        {
          title: 'Installment Period',
          name: 'installmentPeriod',
          type: 'number',
          description: 'Number of months for the installment',
          hidden: ({parent}) => !parent?.isInstallment,
        },
        {
          title: 'Installment Amount',
          name: 'installmentAmount',
          type: 'number',
          description: 'Amount to be paid in each installment',
          hidden: ({parent}) => !parent?.isInstallment,
        },
        {
          title: 'First Payment Date',
          name: 'firstPaymentDate',
          type: 'date',
          description: 'Date of the first installment payment',
          hidden: ({parent}) => !parent?.isInstallment,
        },
      ],
    },
  ],
}
