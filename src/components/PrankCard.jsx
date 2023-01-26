import {Link} from 'react-router-dom'

function PrankCard (props) {
    const {title,time,place,description,prankee,comments,steps,_id} = props
    return (
        <div className='PrankCard'>
            <Link to={`pranks/${_id}`}>
                <h3>{title}</h3>
            </Link>
            <p>{description}</p>
        </div>
    )
}

export default PrankCard