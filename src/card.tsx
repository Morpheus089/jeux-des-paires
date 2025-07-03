import React from 'react'
import './card.css'

type CardProps = {
  spriteIndex: number
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
}

const SPRITE_WIDTH = 100
const SPRITE_HEIGHT = 100
const SPRITES_PER_COLUMN = 18

const Card: React.FC<CardProps> = ({ spriteIndex, isFlipped, isMatched, onClick }) => {
  const backgroundPosition = `0px -${spriteIndex * SPRITE_HEIGHT}px`

  return (
    <div className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front" style={{
          backgroundImage: `url(/cards.png)`,
          backgroundPosition,
          backgroundSize: `100% auto`,
          width: SPRITE_WIDTH,
          height: SPRITE_HEIGHT,
        }} />
        <div className="card-back">❓</div>
      </div>
    </div>
  )
}

export default Card