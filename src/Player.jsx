import React, { useState, useEffect, useRef } from 'react';


export default function Player(props) {

    const card1Name = `${props.hand[0].number}${props.hand[0].kind[0]}`
    const card2Name = `${props.hand[1].number}${props.hand[1].kind[0]}`
    return (
        <div className="player">
            <div className="card"><img src={require(`./images/${card1Name}.jpg`)} alt={indexedDB} width="100px" height="150px" /></div>
            <div className="card"><img src={require(`./images/${card2Name}.jpg`)} alt={indexedDB} width="100px" height="150px" /></div>
        </div>
    )
}
