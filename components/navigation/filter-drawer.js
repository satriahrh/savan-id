import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 280,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  applyButton: {
    margin: theme.spacing(1),
  }
}));

const BRAND = {
  'fluffy': 'Fluffy Baby Wear',
  'little-palmerhaus': 'Little Palmerhaus',
  'kacakids': 'Kaca Kids'
};

const CATEGORY = {
  'setelan': 'Setelan',
  'sleepsuit': 'Sleepsuit',
  'jumper': 'Jumper',
};

const SORT_BY = {
  'popularity': 'Popularitas',
  '-date': 'Terbaru',
  'date': 'Terlama',
  '-price': 'Termurah',
  'price': 'Termahal',
};

const DEFAULT_SORT_BY = 'popularity'

export default function FilterDrawer() {
  const classes = useStyles();

  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSortBy, setSelectedSortBy] = useState(DEFAULT_SORT_BY);

  const handleApply = () => {
    console.log(selectedBrand, selectedCategories, selectedSortBy)
  }

  return (
    <div className={classes.drawer}>
      <List className={classes.root}>
        <ListItem>
          <ListItemText>
            <Typography variant='h5'>
              Mau cari apa kak?
            </Typography>
          </ListItemText>
        </ListItem>
        <ListOfCheckbox
          title='Brand'
          selections={BRAND}
          selected={selectedBrand}
          setSelected={setSelectedBrand}
        />
        <ListOfCheckbox
          title='Kategori'
          selections={CATEGORY}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
        <ListOfRadio
          title='Urutkan dari'
          selections={SORT_BY}
          selected={selectedSortBy}
          setSelected={setSelectedSortBy}
        />
        <Button
          className={classes.applyButton}
          variant='outlined'
          onClick={handleApply}
        >
          Cari dengan filter
        </Button>
      </List>
    </div>
  );
}

function ListOfCheckbox({title, selections, selected, setSelected}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const handleToggle = (value) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];
    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setSelected(newSelected);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List disablePadding>
          {Object.entries(selections).map(([key, value]) => {
            const labelId = `checkbox-list-${title}-label-${key}`;
            return (
              <ListItem
                className={classes.nested} key={key} role={undefined} dense button
                onClick={handleToggle(key)}
              >
                <Checkbox
                  edge="start" checked={selected.indexOf(key) !== -1}
                  tabIndex={-1} disableRipple inputProps={{'aria-labelledby': labelId}}
                />
                <ListItemText id={labelId} primary={value}/>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}

function ListOfRadio({title, selections, selectionsIcon, selected, setSelected}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const handleToggle = (value) => () => {
    setSelected(value);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List disablePadding>
          {Object.entries(selections).map(([key, value], id) => {
            const labelId = `checkbox-list-${title}-label-${key}`;
            return (
              <ListItem
                className={classes.nested} key={key} role={undefined} dense button
                onClick={handleToggle(key)}
              >
                <Radio
                  edge="start" checked={selected === key}
                  tabIndex={-1} disableRipple inputProps={{'aria-labelledby': labelId}}
                />
                <ListItemText id={labelId} primary={value}/>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}