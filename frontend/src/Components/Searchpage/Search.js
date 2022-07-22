import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './styles.css';

export default function Search(props) {
    const email = localStorage.getItem('email');
    const { title, eventtype, author, price,  max_accomodation, description, food, rating, name, originalPrice, id, image } = props;

    const addToWatchlist = () => {

        let watchlistData = {
            email: email,
            textbookId: id,
        }

        console.log(id);

        fetch("http://127.0.0.1:5000/add_to_watchlist", {
            method: 'POST',
            body: JSON.stringify(watchlistData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    alert("Successfully added this book into your watchlist!")
                }
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }

    return (
        <div className="listingContainer">
            <Card style={{ width: '80%' }}>
                <Card.Img src={"http://127.0.0.1:5000" + image} />
                <Card.Body>
                    <Card.Title>{title}, {author}</Card.Title>
                    <Card.Text>Event_Type: {eventtype}</Card.Text>
                    <Card.Text>Max_Accomodation: {max_accomodation}</Card.Text>
                    <Card.Text>Rating: {rating}</Card.Text>
                    <Card.Text>Food: {food}</Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Card.Text className="sellerName">{name}</Card.Text>

                    <div>
                        <Card.Text className="oldPrice">Price ${originalPrice}</Card.Text>
                        <Card.Text className="price">${price}</Card.Text>
                        <Button className="addToWatchlist" onClick={addToWatchlist} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Book The Event</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}