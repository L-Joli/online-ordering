import React from 'react';
import { Button, Modal,  ModalBody, ModalFooter } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
// import { Route, NavLink, } from 'react-router-dom';
import { connect } from 'react-redux';
import { listItemThunk, addInfoThunk } from '../redux/DrinkItem/thunk';
import { listProductThunk } from '../redux/DrinkItem/thunk';
import { IRootState, ThunkDispatch } from '../redux/store';
import { IItem } from '../redux/DrinkItem/state';
import { IProduct } from '../redux/DrinkItem/state';
// import { TiDeleteOutline } from 'react-icons/fa';
import '../scss/drinkitem.scss';




interface IItemProps {
  item: IItem[],
  product: IProduct[],
  match: {
    params: {
      id: string
    }
  },
  listItem: (id: string) => void
  listProduct: (id: string) => void
  addInfo: (id: string, qty: number, selectedOption: { [key: number]: { [key: number]: boolean } }) => void
}

interface IItemState {
  modal: boolean,
  qty: number,
  // price: number,
  extraPrice:number,
  Iced:number,
  Size:number,
  Syrup:number,
  Shot:number,
  price: number,
  selectedOption: { [key: number]: { [key: number]: boolean } },
  button: boolean,
  selectedCharge: { name: string, optionId: number, boolean: boolean, price: string }[]
}



class DrinkItem extends React.Component<IItemProps & RouteComponentProps<{ id: string }>, IItemState> {
  constructor(props: IItemProps & RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      modal: true,
      qty: 1,
      // price: 0,
      extraPrice:0,
      Iced:0,
      Size:0,
      Syrup:0,
      Shot:0,
      price: 0,
      selectedOption: {},
      button: false,
      selectedCharge: []                                                                   
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }




  componentDidMount() {
    this.init();
  }





  async init() {
    await this.props.listItem(this.props.match.params.id)
    await this.props.listProduct(this.props.match.params.id);
    this.setState({
      price: parseFloat(this.props.product.map(item => item.price)[0]),
      selectedOption: {},
      selectedCharge:  []   ,
      extraPrice:0,
      Iced:0,
      Size:0,
      Syrup:0,
      Shot:0,
    })
  }

  async componentDidUpdate(prevProps: IItemProps & RouteComponentProps<{ id: string }>) {
    if (this.props.location.key !== prevProps.location.key) {
      this.setState({ modal: true })
      this.init()
    }
  }
  




  //Set Price
  IncrementItem = () => {
    this.setState({ qty: this.state.qty + 1 });
    // this.setState({ price: this.state.price + parseFloat(this.props.product.map(item => item.price)[0])})
    // this.setState({extraPrice:(this.state.extraPrice!==0?this.state.extraPrice*(this.state.qty+1):0)})
  }

  DecreaseItem = () => {
    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 });
      // this.setState({ price: this.state.price - parseFloat(this.props.product.map(item => item.price)[0]) })
      // this.setState({extraPrice:(this.state.extraPrice!==0?this.state.extraPrice*(this.state.qty):0)})

    } else {
      this.setState({ qty: 1 });
      // this.setState({ price: parseFloat(this.props.product.map(item => item.price)[0]) })
    }
  }

  PriceReset = () => {
    this.setState({ price: parseFloat(this.props.product.map(item => item.price)[0]) })
  }

  // modal form
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.addInfo(this.props.match.params.id, this.state.qty, this.state.selectedOption);
  }



  onSelectedChange = (itemId: number, options: { id: number }[], optionId: number, charges: { optionName: string, extraCharge: string, id: number }[]) => {
    const selectedItem = this.state.selectedOption[itemId]
    const newOptions = options.reduce((acc: { [key: number]: boolean }, option) => {
      acc[option.id] = (
        option.id === optionId &&
        (selectedItem ? !selectedItem[optionId] : true)
      )
      return acc
    }, {})
    // [ 18, 19 ] => {18: true, 19: false} 

    const newSelectedOption = {
      ...this.state.selectedOption,
      [itemId]: newOptions
    }
    console.log(newSelectedOption)
    // [{ 7: {18: true, 19: false}  },
    // { 8: {20: true, 21: false}  }]

    let newExtraCharge = charges.map((a) => ({
      name: a.optionName,
      optionId: a.id,
      boolean: newOptions[a.id],
      price: a.extraCharge
    }))

    console.log(newExtraCharge)

     //shot selection
     if(newExtraCharge[0].name === "1 shot"&&newExtraCharge[0].boolean===true){
       this.setState({
       Shot: parseFloat(newExtraCharge[0].price)
       })
     }else if(newExtraCharge[0].name === "1 shot"&&newExtraCharge[1].boolean===true){
       this.setState({
       Shot: parseFloat(newExtraCharge[1].price)
       })
     }else if(newExtraCharge[0].name === "1 shot"&&newExtraCharge[2].boolean===true){
      this.setState({
      Shot: parseFloat(newExtraCharge[2].price)
      })
    }else if(newExtraCharge[0].name !== "1 shot"){
      this.setState({
      Shot: this.state.Shot
      })
    }else if(newExtraCharge[0].name === "1 shot"&&(newExtraCharge.filter(a=>a.boolean===true)).length===0){
      this.setState({
        Shot: 0
        })
     };
    
    //Syrup selection
    if(newExtraCharge.length===4 &&newExtraCharge[0].boolean===true){
      this.setState({
      Syrup: 5
      })
    } else if (newExtraCharge.length===4 &&newExtraCharge[1].boolean===true){
      this.setState({
      Syrup: 5
      })
    }else if (newExtraCharge.length===4 &&newExtraCharge[2].boolean===true){
      this.setState({
      Syrup: 5
      })
    }else if (newExtraCharge.length===4 &&newExtraCharge[3].boolean===true){
      this.setState({
      Syrup: 5
      })
    }else if(newExtraCharge.length !==4){
      this.setState({
        Syrup: this.state.Syrup
      })
    }else if(newExtraCharge.length ===4&&(newExtraCharge.filter(a=>a.boolean===true)).length===0){
      this.setState({
        Syrup: 0
      })
    }
    
    //Size selection
    if(newExtraCharge.length===2 &&newExtraCharge[0].boolean===true && newExtraCharge[0].name === "small"){
      this.setState({
      Size: parseFloat(newExtraCharge[0].price)
      })
    }else if(newExtraCharge.length ===2&&newExtraCharge[1].boolean===true && newExtraCharge[0].name === "small"){
      this.setState({
        Size: parseFloat(newExtraCharge[1].price)
      })
    }else if(newExtraCharge.length !==2 && newExtraCharge[0].name === "small"){
      this.setState({
        Size :this.state.Size
      })}else if(newExtraCharge.length ===2 && (newExtraCharge.filter(a=>a.boolean===true)).length===0&& newExtraCharge[0].name === "small" ){
        this.setState({
          Size: 0
        })
      }

    //Iced selection
    if(newExtraCharge.length===2 &&newExtraCharge[0].boolean===true && newExtraCharge[0].name === "hot"){
      this.setState({
      Iced: parseFloat(newExtraCharge[0].price)
      })
    }else if(newExtraCharge.length ===2&&newExtraCharge[1].boolean===true && newExtraCharge[0].name === "hot"){
      this.setState({
        Iced: parseFloat(newExtraCharge[1].price)
      })
    }else if(newExtraCharge.length !==2 && newExtraCharge[0].name === "hot"){
      this.setState({
        Iced :this.state.Iced
      })}else if(newExtraCharge.length ===2 && (newExtraCharge.filter(a=>a.boolean===true)).length===0&& newExtraCharge[0].name === "hot" ){
        this.setState({
          Iced:0
        })
      }
    
    
    this.setState(state => ({
      selectedOption: newSelectedOption,
      button: !state.button,
      extraPrice:(state.Iced)+state.Size+state.Syrup+state.Shot
    }))

    // console.log(this.state.selectedCharge)

    //   {selectedOption[id] ? 
    //     options.reduce((acc, option) => {
    //       acc = selectedOption[id][option.id] ? option.optionName : acc
    //       return acc
    //     }, '') 
    //   : false
    // }

     // // const newCharge = {
    // //   ...this.state.selectedCharge,
    // //   newExtraCharge: newExtraCharge
    // }
  }


  render() {
 
    const { modal, selectedOption, qty, } = this.state;
    const { product, item } = this.props;

    return (
      <div>
        <div >
          <Modal isOpen={modal}  className="drinkItems" style={{ maxWidth: '840px', width: '90%' }}>
            <form onSubmit={this.handleSubmit}>
              <Button onClick={this.toggle} className="drinkClose">X</Button>
              {product.map(item => <span key={item.id}>
                <div><picture><img src={require(`../images/${item.image}`)} width="90" height="90" alt="item" /></picture></div>
                <div className="drinkChosen">{item.name}</div>
              </span>)}
              <ModalBody>
                {(item && item.map(({ id, categoryName, options }) =>
                  <div className="row optionRow" key={id} >
                    <div className="categoryName col-12">{categoryName}</div>
                    {/* <div className="drinkItem col-12"> */}
                    {
                      options.map(option =>

                        <div className="optionBtnWrap" key={option.id}>
                          <Button outline color="primary" key={option.id}
                            onClick={() => this.onSelectedChange(id, options, option.id, options)}
                            active={selectedOption[id] ? selectedOption[id][option.id] : false}
                            className="itemTrue" >
                            {option.optionName}
                          </Button>
                          <div className="optionExtraCharge">{option.extraCharge !== "0.00" ? ('+$' + option.extraCharge) : ""}</div>
                        </div>
                      )
                    }
                    {/* </div> */}
                    {/* <p>Selected: {selectedOption[id] ?
                      options.reduce((acc, option) => {
                        acc = selectedOption[id][option.id] ? option.optionName : acc
                        return acc
                      }, '')
                      : false
                    }</p> */}

                  </div>)

                )}

              </ModalBody>
              <ModalFooter>
                <div className="change-qty" >
                  <div className="drinkPrice"><div className="HKD">HKD</div>{(this.state.price+this.state.extraPrice)*this.state.qty} </div>
                  <Button onClick={this.IncrementItem} className="increaseButton"><div>+</div></Button>
                  <div className="qty">{qty}</div>
                  <Button onClick={this.DecreaseItem} className="decreaseButton"><div>-</div></Button>
                  <input type="submit" value="ADD TO BAG" className="drinkBag" onClick={this.toggle} />
                </div>
              </ModalFooter>
            </form>
          </Modal >
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state: IRootState) => {
  return {
    item: state.itemState.item,
    product: state.itemState.product,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
    listItem: (id: string) => dispatch(listItemThunk(id)),
    listProduct: (id: string) => dispatch(listProductThunk(id)),
    addInfo: (id: string, qty: number, selectedOption: { [key: number]: { [key: number]: boolean } }) => dispatch(addInfoThunk(id, qty, selectedOption))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkItem);
