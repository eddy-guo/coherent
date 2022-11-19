import styles from "../styles/Main.module.css";


export default function ChatBoxes({chat_messages}) {
    return (
        <div className={styles.messages}>
            {chat_messages.length > 0 &&
                chat_messages.map((info, index) => {
                    return (
                        <div className={info.style} key={index}><p>{info.content}</p></div>
                    )
                })
            
            }
        </div>
    )
}