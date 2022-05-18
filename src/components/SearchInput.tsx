import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  setName: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
  },
  input: {
    margin: "8px auto",
  },
};

export default function SearchInput({ setName, placeholder }: Props) {
  const [value, setValue] = useState("");

  let timer: NodeJS.Timeout | null = null;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);

    const debounceTimeout = 300;

    if (event.target.value.length <= 2) return setName("");

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setName(event.target.value);
    }, debounceTimeout);
  }
  return (
    <Box sx={styles.container}>
      <TextField
        placeholder={placeholder}
        value={value}
        sx={styles.input}
        onChange={handleChange}
      />
    </Box>
  );
}
