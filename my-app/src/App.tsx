import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import codingDSImg  from './img/ball.png';

type Match = {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

type standing = {
  team: string;
  points: number;
}

function App() {
  const [matches, setMatches] = useState <Match[]>([
    {team1: "Juventus", score1: 5, team2: "Milan", score2: 1},
    {team1: "Roma", score1: 3, team2: "Sassuolo", score2: 1},
    {team1: "Inter", score1: 2, team2: "Genova", score2: 2}
  ])
  const [standing, setStanding] = useState <standing[]>([
    {team: "Juventus", points: 0},
    {team: "Roma", points: 0},
    {team: "Sassuolo", points: 0},
    {team: "Milan", points: 0}
  ])

  const setMatch = (index: number, score: "score1" | "score2", value: number) => {
    matches[index][score] = Math.max(value, 0);
    setMatches([...matches]);
  }
  useEffect(() => {
    const newStanding: standing[] = [];
    matches.forEach(({ team1, team2, score1, score2 }) => {
      const team1Standing = newStanding.find((s) => s.team === team1) ?? { team: team1, points: 0 };
      const team2Standing = newStanding.find((s) => s.team === team2) ?? { team: team2, points: 0 };
      team1Standing.points += score1 > score2 ? 3 : score1 === score2 ? 1 : 0;
      team2Standing.points += score2 > score1 ? 3 : score1 === score2 ? 1 : 0;
      newStanding.push(team1Standing, team2Standing);
    });
    setStanding(newStanding.sort((a, b) => b.points - a.points));
  }, [matches, standing]);

  useEffect(() => {
    setStanding(standing.map((x)=> x));
  }, [...standing]);

  return (
    <div className="App">
      <div className ="title">
        <h1 className ="score">SCORE</h1>
      </div>
      <ul>
        {standing.map(item => <li className="standing">{item.team} → {item.points}</li>)}
      </ul>
      <div className ="title">
        <h1 className ="score">MATCH</h1>
      </div>
      <ul>
        {matches.map(item => <li className="standing">{item.team1} : {item.team2} = {item.score1} : {item.score2}</li>)}
      </ul>
      <img src={codingDSImg} className="ball"></img>
    </div>
  );
}

export default App;
