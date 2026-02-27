import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { Button, Collapse, TextField, Box } from '@mui/material';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.school_name);

    const submitHandler = (event) => {
        event.preventDefault()
        const fields = password === ""
            ? { name, email, schoolName }
            : { name, email, password, schoolName };
        dispatch(updateUser(fields, currentUser.id, "Admin"))
    }

    return (
        <div>
            Name: {currentUser.name}
            <br />
            Email: {currentUser.email}
            <br />
            School: {currentUser.school_name}
            <br />
            <Button variant="contained" sx={{ mt: 2 }}
                onClick={() => setShowTab(!showTab)}>
                {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
            </Button>
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 2, maxWidth: 400 }}>
                    <TextField
                        fullWidth margin="normal" label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth margin="normal" label="School Name"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth margin="normal" label="Email" type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth margin="normal" label="Password" type="password"
                        placeholder="Leave blank to keep current"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={password && password.length < 6 ? "Password must be at least 6 characters" : ""}
                        error={password.length > 0 && password.length < 6}
                    />
                    <Button
                        type="submit" variant="contained" sx={{ mt: 2 }}
                        disabled={password.length > 0 && password.length < 6}
                    >
                        Update
                    </Button>
                </Box>
            </Collapse>
        </div>
    )
}

export default AdminProfile
