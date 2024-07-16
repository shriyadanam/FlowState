import React, {useContext, useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput} from "@chatscope/chat-ui-kit-react";

export function ChatBot ({ messages, setMessages, sendAPIRequest }) {
    const handleSend = async (message) =>{
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        await sendAPIRequest(newMessages);
    }
    
    return (
        <div>
            <div style={{ position:"relative", height: "550px", width: "550px"  }}>
                <MainContainer style={{margin: 0, padding:0, border: "none", borderRadius: '8px', color: '#2B2B2B'}}>
                <ChatContainer>       
                    <MessageList 
                    scrollBehavior="smooth"
                    style={{
                        backgroundColor: '#1C1C1C',
                        color: '#f1aafd',
                        borderRadius: '8px',
                        padding: '10px'
                    }}
                    >
                    {messages.map((message, i) => {
                        return <Message key={i} model={message} 
                        />
                    })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} 
                    style={{
                        backgroundColor: '#2B2B2B',
                        borderColor: '#3A3A3A',
                        color: '#f1aafd',
                        borderRadius: '5px',
                        padding: '10px'
                    }}/>        
                </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default ChatBot;