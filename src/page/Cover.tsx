import { useRef } from "react";
import styles from "./Cover.module.css";

export default function Cover() {
    const fileInputRef = useRef<HTMLInputElement>( null);
    const onChangeCoverImage = () => {
      fileInputRef.current?.click();
      console.log(fileInputRef.current);
    }
    const onCoverImageUpload = ()=>{}


  return (
    <div className={styles.cover}>
  
      <img src="notion-cover.png" alt="Cover" className={styles.image} />
  
    <button className={styles.button} onClick={onChangeCoverImage}>
      Change cover
    </button>
    <input
      onChange={onCoverImageUpload}
      style={{ display: "none" }}
      ref={fileInputRef}
      type="file"
    />
  </div>
  )
}
