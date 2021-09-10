import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import SeatPicker from "react-seat-picker";
import Modal from '@material-ui/core/Modal';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function MovieList(props) {
    const classes = useStyles();
    const [liked, setLiked] = useState([]);
    const [loading, setloading] = useState(false);
    const [open,setopen] = useState(false)

    useEffect(() => {
        const moviesLiked = JSON.parse(
            localStorage.getItem('movies-liked')
        );
        setLiked(moviesLiked);
    }, []);

    const addSeatCallback = async ({ row, number, id }, addCb) => {
        setloading(true)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `Reserved by you`;
        addCb(row, number, id, newTooltip);
        setloading(false)

    };
    const removeSeatCallback = async ({ row, number, id }, removeCb) => {
        setloading(true)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        setloading(false)
    };

    const saveToLocalStorage = movieslist => {
        console.log(movieslist)
        localStorage.setItem('movies-liked', JSON.stringify(movieslist));
    }

    const addLikedMovie = (movie) => {
        console.log(liked)
        console.log(movie)
        //if (!liked) return
        if (liked?.find(elm => elm.id === movie.id)) {
            const newMovieList = liked.filter(
                (elm) => elm.id !== movie.id
            );
            setLiked(newMovieList);
            saveToLocalStorage(newMovieList);

        } else {
            const newMovieList = [...(liked || []), movie];
            setLiked(newMovieList);
            saveToLocalStorage(newMovieList);
        }
    };

    const rows = [
        [
            { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
            { id: 2, number: 2, tooltip: "Cost: 15$" },
            null,
            {
                id: 3,
                number: "3",
                isReserved: true,
                orientation: "east",
                tooltip: "Reserved by Rogger"
            },
            { id: 4, number: "4", orientation: "west" },
            null,
            { id: 5, number: 5 },
            { id: 6, number: 6 }
        ],
        [
            {
                id: 7,
                number: 1,
                isReserved: true,
                tooltip: "Reserved by Matthias Nadler"
            },
            { id: 8, number: 2, isReserved: true },
            null,
            { id: 9, number: "3", isReserved: true, orientation: "east" },
            { id: 10, number: "4", orientation: "west" },
            null,
            { id: 11, number: 5 },
            { id: 12, number: 6 }
        ],
        [
            { id: 13, number: 1 },
            { id: 14, number: 2 },
            null,
            { id: 15, number: 3, isReserved: true, orientation: "east" },
            { id: 16, number: "4", orientation: "west" },
            null,
            { id: 17, number: 5 },
            { id: 18, number: 6 }
        ],
        [
            { id: 19, number: 1, tooltip: "Cost: 25$" },
            { id: 20, number: 2 },
            null,
            { id: 21, number: 3, orientation: "east" },
            { id: 22, number: "4", orientation: "west" },
            null,
            { id: 23, number: 5 },
            { id: 24, number: 6 }
        ],
        [
            { id: 25, number: 1, isReserved: true },
            { id: 26, number: 2, orientation: "east" },
            null,
            { id: 27, number: "3", isReserved: true },
            { id: 28, number: "4", orientation: "west" },
            null,
            { id: 29, number: 5, tooltip: "Cost: 11$" },
            { id: 30, number: 6, isReserved: true }
        ]
    ];

    return (
        <>
            <Modal
                open={open}
                onClose={()=>setopen(false)}
                aria-labelledby="Seat-Picker"
                aria-describedby="Seat-Picker"
            >
                <div style={{backgroundColor: "white", width: 400, margin: "0 auto", marginTop: "25%"}}>
                    <h3 style={{color:"black"}}>Seat Picker</h3>
                    <div >
                        <SeatPicker
                            addSeatCallback={addSeatCallback}
                            removeSeatCallback={removeSeatCallback}
                            rows={rows}
                            maxReservableSeats={3}
                            alpha
                            visible
                            selectedByDefault
                            loading={loading}
                            tooltipProps={{ multiline: true }}
                        />
                    </div>
                </div>
            </Modal>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {props.movies.map((movie, index) => (
                    <Grid item xs={12} md={3} xl={3} key={index}>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Movies" className={classes.avatar}>
                                        M
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={movie.original_title}
                                subheader={movie.release_date}
                            />
                            <CardMedia
                                className={classes.media}
                                image={'https://image.tmdb.org/t/p/original' + movie.poster_path}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {movie.overview}
                                </Typography>
                            </CardContent>
                            {props.showlike ? <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={(e) => addLikedMovie(movie)}>
                                    <FavoriteIcon style={{ color: liked ? (liked.find(elm => elm.id === movie.id) ? 'red' : undefined) : undefined }} />
                                </IconButton>
                                <IconButton aria-label="seat-picker" onClick={(e) => setopen(true)}>
                                    <ConfirmationNumberIcon/>
                                </IconButton>
                            </CardActions> : undefined}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
