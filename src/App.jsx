import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
	const [carta1, setCarta1] = useState("");
	const [carta2, setCarta2] = useState("");

	const [deck, setDeck] = useState("");

	const [c1Value, setC1Value] = useState(0);
	const [c2Value, setC2Value] = useState(0);

	const [newCard, setNewCard] = useState("");
	const [newCardVal, setNewCardVal] = useState(0);

	const [crupier1, setCrupier1] = useState("");
	const [crupier2, setCrupier2] = useState("");

	const [img , setImg] = useState("")

	const [valCrupier1, setValCruier1] = useState(0);
	const [valCrupier2, setValCruier2] = useState(0);

	const [newCardCup, setNewCardCup] = useState("");
	const [newValCup, setValCardCup] = useState(0);


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
				setC1Value(parseInt(res.data[0].value));
				setC2Value(parseInt(res.data[1].value));
			});
	};

	const CrupierCards = () => {
		axios
			.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=2`)
			.then((res) => {
				setImg(res.data.cards[0].image)
				setCrupier1('https://deckofcardsapi.com/static/img/back.png');
				setCrupier2(res.data.cards[1].image);
				setC1Value(parseInt(res.data[0].value));
				setC2Value(parseInt(res.data[1].value));
			});
	};

	const moreCard = () => {
		axios
			.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
			.then((res) => {
				setNewCard(res.data.cards[0].image);
				setNewCardVal(parseInt(res.data[0].value));
			});
	};

	const iStay = () => {
		setCrupier1(img)
		totalVal = valCrupier1 + valCrupier2
		if( totalVal < 16){
			axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
			.then((res) => {
				setNewCardCup(res.data.cards[0].image);
				setNewValCup(parseInt(res.data[0].value));
			});
		}

	};

	return (
		<>
			<div className="mesa">
				<div className="botones">
					<button
						onClick={() => {
							SearchCard();
							CrupierCards();
							return;
						}}
					>
						Distribute
					</button>
					<button onClick={NewGame}>Shuffle</button>
				</div>

				<div className="juego">
					<center>
						<h1>Crupier</h1>
					</center>
					<img src={crupier1} style={{ width: "150px" }} />
					<img src={crupier2} style={{ width: "150px" }} />
					{/* mas cartas */}
					<img src={newCardCup} style={{ width: "150px" }}/>

					<center>
						<h1>Player</h1>
					</center>
					<img src={carta1} style={{ width: "150px" }} />
					<img src={carta2} style={{ width: "150px" }} />
					{/* mas cartas */}
					<img src={newCard} style={{ width: "150px" }} />
				</div>
				<div className="botones">
					<button onClick={moreCard}>+ Card</button>
					<button onClick={iStay}>I stay</button>
				</div>
			</div>
		</>
	);
}

export default App;
