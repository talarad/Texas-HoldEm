import React, { useState, useEffect, useRef } from 'react';
import { TemporaryDrawer } from './drawer';
import { ButtonAppBar } from './MuiAppBar';

export const TopBar: React.FC<{}> = (p) => {
    return (
        <div >
            <div >
                <ButtonAppBar />
            </div>
        </div>
    )
}