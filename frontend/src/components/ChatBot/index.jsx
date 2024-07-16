import React, {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput} from "@chatscope/chat-ui-kit-react";
const API_KEY = "sk-proj-xlPDuOLmjHLxss6V4rxdT3BlbkFJIZyrR6NLJYZ3KAwhFMcL"

export function ChatBot () {
    const systemMessage = {
        "role": "system",
        "content": "Explain like a tech support agent who is knowledgeable about computer networks"
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