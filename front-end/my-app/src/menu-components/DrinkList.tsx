import React from 'react';
import { connect } from 'react-redux';
import { listDrinksThunk } from '../redux/DrinkList/thunk';
import { IRootState, ThunkDispatch } from '../redux/store';
import { RouteComponentProps } from 'react-router-dom';
import { NavLink, } from 'react-router-dom';
import { Card } from 'reactstrap';
import { IDrink } from '../redux/DrinkList/state';
import DrinkItem from './DrinkItem';
import { resetDrinks } from '../redux/DrinkList/actions';
import { PrivateRoute } from '../PrivateRouteUser';



interface IDrinksProps {

    drinks: IDrink[],
    match: {
        params: {
            type: string
        }
    },
    listDrinks: (type: string) => void,
    resetDrinks: () => void,
}

interface IDrinksState {
    modal: boolean
}


export class DrinkList extends React.Component<IDrinksProps & RouteComponentProps<{ type: string }>, IDrinksState>{

    constructor(props: IDrinksProps & RouteComponentProps<{ type: string }>) {
        super(props);
        this.state = {
            modal: true
        };

    }



    componentDidMount() {
        this.props.listDrinks(this.props.match.params.type)
    }

    componentDidUpdate(prevProps: IDrinksProps & RouteComponentProps<{ type: string }>) {

        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.props.listDrinks(this.props.match.params.type)
        }
    }



    public render() {

        return (


            <div className="menuList">
                {(this.props.drinks &&
                    this.props.drinks.map(item =>
                        <Card key={item.id}>
                            <NavLink to={`/menu/${this.props.match.params.type}/${item.id}`} key={item.id} className="itemsNavlink">

                                <picture >  <img src={require(`../images/${item.image}`)} width="90" height="90" alt="item" /> </picture>
                                {/* {item.image} */}
                                <div className="itemName">{item.name} </div>
                                <div className="itemPrice">
                                    <div className="HKD">HKD</div> 
                                <div className="iPrice">{item.price}</div>
                                </div>

                            </NavLink>
                        </Card>))}
               
                <PrivateRoute path={`/menu/${this.props.match.params.type}/:id`} exact={true} component={DrinkItem} />
            </div>
            /* <Route path={`/menu/${this.props.match.params.type}?id=`} component={DrinkItem} /> */
        )

    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        drinks: state.drinkState.drinks,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        listDrinks: (type: string) => dispatch(listDrinksThunk(type)),
        resetDrinks: () => dispatch(resetDrinks()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DrinkList);

