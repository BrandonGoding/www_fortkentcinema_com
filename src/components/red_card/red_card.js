import './red_card.scss'

const RedCard = ({block_content}) => {
    return (
        <div className="container-block spotlight">
            {block_content}
        </div>
    );
}

export default RedCard;