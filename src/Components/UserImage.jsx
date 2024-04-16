import React from 'react';

const UserImage = () => {
    const [File, setFile] = useState("");
    const [imgTF, setimgTF] = useState(false);
    const [Location, setLocation] = useState("")
    const [Image, setImage] = useState("");

    const imgPreview = () => {
        const reader = new FileReader();
    
        if (File) {
          reader.readAsDataURL(File);
        }
    
        reader.onloadend = () => {
          setImage(reader.result);
        };
      };
    
      useEffect(() => {
        if (File && File instanceof Blob) {
          imgPreview();
        }
      }, [File]);
    
      const handleImgChange = (e) => {
        let img = e.target.files[0];
        if (img) {
          setFile(img);
          setimgTF(true);
          imgPreview();
        } else {
          console.log("No file selected");
        }
      };
    
      const handleLocChange = (e)=>{
        setLocation(e.target.value)
      }

  return (
    <div>
      
    </div>
  );
}

export default UserImage;
