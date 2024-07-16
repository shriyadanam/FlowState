import React, {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput} from "@chatscope/chat-ui-kit-react";
import { API_KEY } from "../../keys.js"

export default function ChatBot () {
    const systemMessage = {
        "role": "system",
        "content": "Explain like a tech support agent whose knowledgeable about computer networks"
    }

    const [messages, setMessages] = useState([
        {
            message: "What can I help you with?",
            sender: "ChatGPT",
            direction: "incoming"
        }
    ])
    
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
    async function sendAPIRequest(chatMessages){
        let apiMessages = chatMessages.map((msgObj) =>{
            let role = msgObj.sender === "ChatGPT" ? "assistant" : "user";
            return {
                role: role,
                content: msgObj.message
            }
        })
        
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions", 
            {
              method: "POST",
              headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(apiRequestBody)
            }).then((data) => {
              return data.json();
            }).then((data) => {
              setMessages(() => {
                const newMessages = [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: "incoming"
                  }]
                console.log(newMessages)
                return newMessages
              });
            });
    
    }
    
    return (
        <div>
            <div style={{ position:"relative", height: "800px", width: "700px"  }}>
                <MainContainer>
                <ChatContainer>       
                    <MessageList 
                    scrollBehavior="smooth"
                    >
                    {messages.map((message, i) => {
                        return <Message key={i} model={message} />
                    })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} />        
                </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

