import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

let cardImages = []

for (var i = 1; i <= 90; i++) {
	cardImages[i] = { src: 'img/' + i + '.png', matched: false }
}

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(null)

	// Shuffle cards
	const shuffleCards = () => {
		cardImages = cardImages.sort(() => Math.random() - 0.5)
		let slicedCardImages = cardImages.slice(0, 6)

		const shuffledCards = [...slicedCardImages, ...slicedCardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))

		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCards)
		setTurns(0)
	}

	// handle a choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	// compare two selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true }
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	useEffect(() => {
		shuffleCards()
	}, [])

	// reset choice & increase turn
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

	return (
		<div className='App'>
			<div className='wrapper'>
				<div className='card-grid'>
					{cards.map((card) => (
						<SingleCard
							key={card.id}
							card={card}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
				</div>
				<div className='details'>
					<p className=''>
						Time:{' '}
						<span>
							<b>20</b>
						</span>
					</p>
					<p className=''>
						Turns:{' '}
						<span>
							<b>{turns}</b>
						</span>
					</p>
					<button onClick={shuffleCards}>Restart</button>
				</div>
			</div>
		</div>
	)
}

export default App
