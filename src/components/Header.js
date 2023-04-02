import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { useMode } from '../contexts/ModeProvider';

const Header = () => {
    const { toggleNoteMode } = useMode();

    return (
        <header>
            <label htmlFor='note-mode'>Note Mode</label>

            <Switch.Root
                onClick={toggleNoteMode}
                className='toggle'
                id='note-mode'
            >
                <Switch.Thumb className='switch-thumb' />
            </Switch.Root>
        </header>
    );
};

export default Header;
