import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
	const [carta1, setCarta1] = useState("");
	const [carta2, setCarta2] = useState("");

	const [deck, setDeck] = useState("");

	const [c1Value, setC1Value] = useState(0);
	const [c2Value, setC2Value] = useState(0);

	const [crupier1, setCrupie1] = useState(0);
	const [crupier2, setCrupier2] = useState("");

	const NewGame = () => {
		axios
			.get(
				`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
			)
			.then((res) => setDeck(res.data.deck_id));
	};

	const SearchCard = () => {
		axios
			.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=2`)
			.then((res) => {
				setCarta1(res.data.cards[0].image);
				setCarta2(res.data.cards[1].image);
				setC1Value(parseInt(res.data.value));
				setC2Value(parseInt(res.data.value));
			});
	};

	return (
		<>
			<div className="mesa">
				<button onClick={SearchCard}>New card</button>
				<button onClick={NewGame}>New Game</button>

				<div className="juego">
					<h1>Crupier</h1>
					<img src={crupier1} style={{ width: "150px" }} />
					<img src={crupier2} style={{ width: "150px" }} />

					<h1>Player</h1>
					<img src={carta1} style={{ width: "150px" }} />
					<img src={carta2} style={{ width: "150px" }} />
				</div>
				<button onClick={NewGame}>+ Card</button>
				<button onClick={NewGame}>I stay</button>
			</div>
		</>
	);
}

export default App;
