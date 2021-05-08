import { useEffect, useState } from 'react';
import './App.css';
import operators from './operators.json';
import RandomizeIcon from './assets/randomize.svg';

function App() {
  const [ input, setInput ] = useState('');
  const [ operator, setOperator ] = useState(null);
  const [ resultNotFound, setNotFound ] = useState(false);
  //console.log(operators);

  useEffect(() => {
    searchForOp(null, false);
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const searchForOp = (e, activeSearch) => {
    if(e)
      e.preventDefault();
    if(input.trim() === '')
      return;
    const operator = Object.keys(operators).find(i => i.toLowerCase() === input.toLowerCase());
    if(!operator) {
      //show no result page
      if(activeSearch) {
        setNotFound(true);
        setOperator(null);
      }
    }
    else {
      //populate result card
      const result = operators[operator];
      setNotFound(false);
      setOperator({ ...result, safename: operator });

      if(activeSearch)
        setInput('');
      console.log(`found ${operator}`, result);
    }
  }

  const randomizeOp = () => {
    const randomName = Object.keys(operators)[Math.floor(Math.random()*Object.keys(operators).length)];
    const operator = operators[randomName];
    console.log(`random op`, operator);
    setOperator({ ...operator, safename: randomName });
  }

  return (
    <>
    <div className="App">
      <div className="header">
        <h1>
        Discover your favorite<br/>
        Siege Operators
        </h1>
      </div>
      <form onSubmit={(e)=>searchForOp(e, true)} className="searchContainer">
        <input autoFocus className="opSearch" placeholder="search here" value={input} onChange={handleChange} />
        <div className="randomizeContainer" onClick={randomizeOp} title="click to randomize operator selection">
          <span>Randomize</span><img src={RandomizeIcon} alt="randomize selection" />
        </div>
      </form>
      {
        resultNotFound &&
        <div className="noresult">
          No such operator found.. Perhaps next season?
        </div>
      }
      {
        operator &&
        <div className="operatorCard">
          <div className="alias">{operator.name}</div>
          <div className="type">
            {operator.role}
            <span className="gender">{operator.meta.sex==="f" ? 'FEMALE' : 'MALE'}</span>
          </div>
          <div className="barContainer">
            <div className="title">speed</div>
            <div className="value">
            <div className="barParent">
                <div className="bar" style={{ width: `${operator.ratings.speed * 50}px`}}></div>
              </div>
              <div className="valueNumber">{operator.ratings.speed}</div>
            </div>
          </div>
          <div className="barContainer">
            <div className="title">armor</div>
            <div className="value">
              <div className="barParent">
                <div className="bar" style={{ width: `${operator.ratings.armor * 50}px`}}></div>
              </div>
              <div className="valueNumber">{operator.ratings.armor}</div>
            </div>
          </div>
          <div className="name">{operator.bio.real_name}</div>
          <div className="row">
            <div className="title">birthplace</div>
            <div className="value">{operator.bio.birthplace}</div>
          </div>
          <div className="row">
            <div className="title">unit</div>
            <div className="value highlighted">{operator.unit}</div>
          </div>
          <div className="row">
            <div className="title">season</div>
            <div className="value highlighted">{operator.meta.season}</div>
          </div>
          <div className="row">
            <div className="title">height</div>
            <div className="value">{operator.meta.height}</div>
          </div>
          <div className="row">
            <div className="title">weight</div>
            <div className="value">{operator.meta.weight}</div>
          </div>
          <img
            className="op-icon"
            src={require(`./assets/operator-icons/${operator.safename.toLowerCase()}.svg`).default}
            alt="operator icon"
          />
        </div>
      }
    </div>
    <div id="filmGrain"></div>
    </>
     );
}

export default App;
