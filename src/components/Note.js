import React from 'react';
import * as Popover from "@radix-ui/react-popover";
import * as Portal from '@radix-ui/react-portal';
import { AiOutlineArrowUp, AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai';
import Comment from './Comment';

const Note = ({ noteDetails, noteDispatch }) => {
    const { id, coords, comments, target_selector } = noteDetails;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        noteDispatch({
            type: 'comment_added',
            payload: {
                id,
                text: data.get('text')
            }
        });
        
        // reset form input
        data.delete('text');
    }

    return (
        <Popover.Root defaultOpen={ true }>
            <Portal.Root
                className='note'
                container={ document.querySelector(target_selector) }
                style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
            >
                <Popover.Trigger
                    className="note-pin pin"
                />
            </Portal.Root>

            <Popover.Portal>
                <Popover.Content className="note-container" side='right' sideOffset={ 20 }>
                    <div className="note-header">
                        <div className="buttons">
                            <button className='note-icons-btn'>
                                <AiOutlineCheckCircle />
                            </button>

                            <Popover.Close className='note-icons-btn'>
                                    <AiOutlineClose />
                            </Popover.Close>
                        </div>
                    </div>
                    
                    <div className="comments-container">
                        {
                            comments.map((comment) => {
                                const { id } = comment;
                                
                                return (
                                    <Comment
                                        key={ id }
                                        commentDetails={ comment }
                                        noteDispatch={ noteDispatch }
                                    />
                                )
                            })
                        }
                    </div>

                <form action="" onSubmit={ handleCommentSubmit }>
                    <img src="https://i.pravatar.cc/300" alt="" />

                    <div className="form-buttons">
                        <input type="text" name="text" placeholder='Reply'/>
                        <button>
                            <AiOutlineArrowUp fill='#fff' />
                        </button>
                    </div>
                </form>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default Note;