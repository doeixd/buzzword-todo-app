import React, { Component, Fragment as F } from 'react';
import {observer} from 'mobx-react';
import { Link } from "react-router-dom";


@observer
export default class Login extends Component {

    render() {
        return (
        <F>
            <div id='signin' href='login.html'> <Link  to={`/login`}>LOGIN</Link> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill='white' viewBox="0 0 24 24"><path d="M15.366 0c-6.248 0-8.665 7.498-3.77 12.4 3.134 3.14 7.864 3.498 10.566.792 4.559-4.566.008-13.192-6.796-13.192zm4.909 11.287c-1.985 1.988-5.062.916-4.812-1.718.056-.59-.442-1.086-1.029-1.029-2.609.249-3.709-2.822-1.714-4.821 1.995-1.998 5.062-.895 4.812 1.718-.056.594.444 1.087 1.029 1.03 2.607-.248 3.71 2.82 1.714 4.82zm-11.798 7.053l2.119 2.122-1.413 1.416-1.413-1.416-.706.708 1.413 1.415-1.413 1.415-2.119-2.123-2.12 2.123-2.825-2.83 8.891-8.905c.38.547.811 1.067 1.293 1.55.476.477.992.902 1.534 1.279l-3.241 3.246z"/></svg>
            </div>
            {/* <Modal>
            heyyyyy
            </Modal> */}
        </F>
        )
    }

}


// class Modal extends React.Component {
//   render() {
//     return ReactDOM.createPortal(
//       this.props.children,
//       document.getElementById('modal-root'),
//     );
//   }
// }