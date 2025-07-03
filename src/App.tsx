import { useEffect, useState } from 'react'
import Card from './card'
import './App.css'

type CardType = {
  id: number
  spriteIndex: number
  isFlipped: boolean
  isMatched: boolean
}

const NUM_CARDS = 18

function App() {
  const [cards, setCards] = useState<CardType[]>([])
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    const sprites = Array.from({ length: NUM_CARDS }, (_, i) => i)

    const deck = [...sprites, ...sprites]
      .map((spriteIndex, index) => ({
        id: index,
        spriteIndex,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setCards(deck)
  }, [])

  const handleClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    const newSelected = [...selected, index]

    if (newSelected.length === 2) {
      const [first, second] = newSelected
      if (newCards[first].spriteIndex === newCards[second].spriteIndex) {
        newCards[first].isMatched = true
        newCards[second].isMatched = true
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false
          newCards[second].isFlipped = false
          setCards([...newCards])
        }, 1000)
      }
      setSelected([])
    } else {
      setSelected(newSelected)
    }

    setCards(newCards)
  }

  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          spriteIndex={card.spriteIndex}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

export default App