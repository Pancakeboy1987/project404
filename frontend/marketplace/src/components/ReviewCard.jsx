import './ReviewCard.css'

export default function ReviewCard({item}){
    return(
        <div className="review-card">
            <div id={item.id} className="review-name">
                {item.name}
            </div>
            <div className='review-text'>
                {item.text}
            </div>
        </div>
    )
}