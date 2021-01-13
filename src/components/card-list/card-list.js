import Card from '../card/card'

const CardList = ({list}) => {
    const  cardList = list.map(item => {
      return <Card cardInfo={item}/>
    }) 
    return (<ul className="main__card-list">
      {cardList}
    </ul>)
 };

 export default CardList;