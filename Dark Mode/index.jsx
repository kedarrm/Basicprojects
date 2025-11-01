"use client";

import React, { useEffect, useState, useCallback } from "react";

// Fisher-Yates shuffle for unbiased randomization
function fisherYatesShuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const icons = ["🍎", "🍌", "🍇", "🌟", "🔥", "🎲", "🎯", "🎵", "🐱", "🚀"];

const MemoryGame = () => {
    const [gridSize, setGridSize] = useState(2);

    const [array, setArray] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [won, setWon] = useState(false);
    const [moves, setMoves] = useState(0);

    const handleGridSize = (e) => {
        const size = parseInt(e.target.value);
        if (2 <= size && size <= 10 && size % 2 === 0) {
            setGridSize(size);
            setError("");
        } else {
            setError("Grid size must be even (2, 4, 6, 8, 10)");
        }
    };

    const initializeGame = useCallback(() => {
        const totalCards = gridSize * gridSize;
        const pairCount = totalCards / 2;

        const selectedIcons = icons.slice(0, pairCount);
        const cardIcons = [...selectedIcons, ...selectedIcons];
        const shuffled = fisherYatesShuffle(cardIcons);

        const cards = shuffled.map((icon, index) => ({
            id: index,
            icon,
        }));

        setArray(cards);
        setFlipped([]);
        setSelectedPairs([]);
        setDisabled(false);
        setWon(false);
        setMoves(0);
    }, [gridSize]);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const handleMatch = (secondId) => {
        const [firstId] = flipped;
        setMoves((prev) => prev + 1);

        if (array[firstId].icon === array[secondId].icon) {
            setSelectedPairs((prev) => [...prev, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 800);
        }
    };

    const handleClick = (id) => {
        if (disabled || won || flipped.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
        } else if (flipped.length === 1) {
            setFlipped((prev) => [...prev, id]);
            setDisabled(true);
            handleMatch(id);
        }
    };

    useEffect(() => {
        if (selectedPairs.length === array.length && array.length > 0) {
            setWon(true);
        }
    }, [selectedPairs, array]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-6">Memory Game 🎯</h1>

            {/* Grid Size Input */}
            <div className="mb-4">
                <label className="font-medium" htmlFor="gridSize">
                    Grid Size (even up to 10):
                </label>
                <input
                    type="number"
                    min="2"
                    max="10"
                    value={gridSize}
                    onChange={handleGridSize}
                    className="w-16 ml-3 rounded border-2 px-2 py-1 text-center"
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            {/* Move Count */}
            <p className="text-lg font-medium mb-3">Moves: {moves}</p>

            {/* Cards Grid */}
            <div
                className="grid gap-2 mb-6"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    width: `min(100%,${gridSize * 5.5}rem)`,
                }}
            >
                {array.map((card) => {
                    const isMatched = selectedPairs.includes(card.id);
                    const isFaceUp = flipped.includes(card.id) || isMatched;
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleClick(card.id)}
                            className={`aspect-square flex items-center justify-center text-3xl transition-all duration-300 font-bold rounded-lg cursor-pointer transform
                ${isFaceUp
                                    ? "bg-blue-500 text-white rotate-y-180"
                                    : "bg-gray-300 text-gray-400"
                                }
              `}
                        >
                            {isFaceUp ? card.icon : "?"}
                        </div>
                    );
                })}
            </div>

            {/* Reset Button */}
            <button
                className="px-5 py-2 bg-green-500 rounded text-white font-semibold hover:bg-green-600"
                onClick={initializeGame}
            >
                Reset
            </button>

            {/* Win Modal */}
            {won && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-3xl font-bold mb-3 text-green-600">
                            You Won! 🎉
                        </h2>
                        <p className="text-lg mb-4">Total Moves: {moves}</p>
                        <button
                            onClick={initializeGame}
                            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                        >
                            Play Again 🔁
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
