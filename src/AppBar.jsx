import React, { useState, useEffect, useRef } from 'react';
import { TemporaryDrawer } from './drawer';
import { ButtonAppBar } from './MuiAppBar';

export const TopBar = (p) => {
    return (
        <div id="top-bar">
            <div >
                <ButtonAppBar />
            </div>
        </div>
    )
}