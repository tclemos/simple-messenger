import React from "react"
import { withRouter } from 'react-router-dom';

function Contacts(props) {
    console.log()
    return (
        <div>
            Contact screen <br />
            <br />
            <a href={`/messages/${props.match.params.uid}`}>Messages</a>
        </div>
    )
}

export default withRouter(Contacts)