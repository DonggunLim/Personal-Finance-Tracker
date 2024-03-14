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
  ],
}
