import React from 'react';

function Settings() {
    return (
        <div className='settings'>
            <form>
                <div className='input-align' style={{width: '100%'}}>
                    <div style={{width: '100%', marginRight: '20px'}}>
                        <p>FIRSTNAME</p>
                        <input type='text'/>
                    </div>
                    <div style={{width: '100%'}}>
                        <p>LASTNAME</p>
                        <input type='text'/>
                    </div>
                </div>

                <p>EMAIL</p>
                <input type='text'/>
                <p>PASSWORD</p>
                <h1>**********</h1>
                <button>EDIT</button>
            </form>
        </div>
    );
}

export default Settings;