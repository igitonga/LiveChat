import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material"; 
import { useNavigate } from "react-router-dom";

const ChatPreview = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClickOnChat = () =>{
        navigate('chat')
    }

    return(
        <div className="flex py-2 items-center" 
             style={{ borderBottom: `1px solid ${theme.palette.background.paper}` }}
             onClick={handleClickOnChat}
        >
            <AccountCircle color="action" sx={{ fontSize: '50px' }}/>
            <div className="ml-3">
                <p style={{ fontWeight: 'bold' }}>{props.name}</p>
                <p style={{ fontSize: '12px' }}>{props.text}</p>
            </div>
        </div>
    )
}

export default ChatPreview