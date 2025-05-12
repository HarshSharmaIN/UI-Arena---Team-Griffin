import { HiStar } from 'react-icons/hi'

const ReviewCard = ({ review }) => {
  const { userName, rating, date, content } = review
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <HiStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-secondary-500' : 'text-neutral-300'
        }`}
      />
    ))
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-neutral-900">{userName}</h4>
          <p className="text-sm text-neutral-500">{formattedDate}</p>
        </div>
        <div className="flex">
          {renderStars(rating)}
        </div>
      </div>
      <p className="mt-3 text-neutral-700 leading-relaxed">{content}</p>
    </div>
  )
}

export default ReviewCard