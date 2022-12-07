import { Box, Button, Container, List, TextField } from "@mui/material";
import { useState } from "react";

export default function Chat() {
  const [list, setList] = useState([]);
  //   return (
  //     <Container container sx={{ width: "90vw", height: "80vh", mt: 5 }}>
  //       <Box sx={{ flex: 1, height: " 100%", backgroundColor: "lightGray" }}>
  //         {list.map(x=>(

  //         <List sx={{}}>{x}</List>
  //         ))}
  //       </Box>

  //       <Box sx={{ backgroundColor: "pink", display: "flex" }}>
  //         <TextField
  //           fullWidth
  //           size="small"
  //           onChange={(e) => list.push(e.target.value)}
  //         />
  //         <Button
  //           onClick={(e) =>
  //              setList(e.target.value)
  //           }
  //           sx={{ border: "2px solid gray", color: "black" }}
  //         >
  //           Send
  //         </Button>
  //       </Box>
  //     </Container>
  //   );
  return (
    <div>
      <title>Socket.IO chat</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }\n\n      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }\n      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }\n      #input:focus { outline: none; }\n      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }\n\n      #messages { list-style-type: none; margin: 0; padding: 0; }\n      #messages > li { padding: 0.5rem 1rem; }\n      #messages > li:nth-child(odd) { background: #efefef; }\n    ',
        }}
      />
      <ul id="messages" />
      <form id="form" action>  
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
}
