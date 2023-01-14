import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'

export const CardList = (goals: string[]) => {

    const displayCards = goals.map((goal, i) => {
        return (
            // TODO: move this into its own component
            <Card key={i} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Title>{goal}</Card.Title>
                        <Card.Text>
                            Some description for the goal which is not ready
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
            </Card>
        )
    })
    return (
        displayCards
    )
}
