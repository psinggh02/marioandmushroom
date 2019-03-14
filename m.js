class MarioAndMushroom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        grid: {
          width: 0,
          height: 0            
        },
        showGrid: false
    }
  }
  startGame= () => { 
      let width = prompt("Please enter board width", "");
      let height = prompt("Please enter board height", "");
      this.setState({
        grid: {
          width: parseInt(width),
          height: parseInt(height)            
        },
        showGrid: true
      });
  }
  
  handleOnKeyPress = (e) => {
    console.log(e.target.className);
  }  

  render() {
      if(!this.state.showGrid) {
          return (
            <div>
              <h2 className="header">MARIO AND MUSHROOM</h2>
              <div className="startBox">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/MarioNSMBUDeluxe.png/220px-MarioNSMBUDeluxe.png"></img>
                <button className="btn btn-success" onClick={this.startGame}>START</button>
              </div>
            </div>
          )         
      } else {
          return (
            <div>
              <h2 className="header">MARIO AND MUSHROOM</h2>
              <div className="startBox">
                   <Blocks grid={this.state.grid} />
              </div>
            </div>
          )       
      }
  }
}

function generateGrid(width, gridSize){
  let emptyArr = Array(gridSize).fill(false);
  let arr = [];
  let newArr = [];
  while(arr.length < width){
      let r = Math.floor(Math.random()*gridSize) + 1;
      if(r!==1 && arr.indexOf(r) === -1) arr.push(r);
  }
  emptyArr[0] = "mario";    
  for(let k in arr) {
    emptyArr[arr[k]-1] = "mushroom";
  }
  for(let i in emptyArr) {
    if(!emptyArr[i]) emptyArr[i] = "emptyBox";
  }
  while(emptyArr.length) newArr.push(emptyArr.splice(0,width));
  return newArr;
}

class Blocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      divStyle: {
        width:(this.props.grid.width*40)+2,
        "marginLeft": "30%"
      },
      mCounter: 0
    }
  }
 
   getParams = (e) => {  
    const elm = $(e.target);
    const mario = $(elm).find(".mario");
    const id = $(mario).attr('id');
    const whichBox = id.split("_");
    const row = parseInt(whichBox[0]);
    const col = parseInt(whichBox[1]);  
    return {
      elm : elm,
      mario : mario,
      id : id,
      whichBox : whichBox,
      row : row,
      col : col   
    }  
  }
  checkWin = (count) => {
    if(count === this.props.grid.width) {
      setTimeout(() => alert("You Won!"), 100);
      ;
    }
  }
  moveLeft = (e) => {
    const newBlock = Object.assign({}, this.state.blocks);
    let params = this.getParams(e);
    let nCol = params.col-1;
    if(nCol === -1){
      newBlock[params.row][0] = "emptyBox";
      newBlock[params.row][newBlock[params.row].length-1] = "mario";
    } else if(newBlock[params.row][nCol] && newBlock[params.row][nCol] === "mushroom") {
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[params.row][nCol] = "mario";
      this.setState({mCounter: this.state.mCounter+1});
    } else if(newBlock[params.row][nCol] && newBlock[params.row][nCol] === "emptyBox"){
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[params.row][nCol] = "mario";      
    } 
    this.setState({block: newBlock});
    this.checkWin(this.state.mCounter);
  }
  
  moveUp = (e) => {
    const newBlock = Object.assign({}, this.state.blocks);
    let params = this.getParams(e);
    let nRow = params.row-1;
    if(nRow === -1){
      newBlock[0][params.col] = "emptyBox";
      newBlock[this.props.grid.height-1][params.col] = "mario";
    } else if(newBlock[nRow][params.col] && newBlock[nRow][params.col] === "mushroom") {
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[nRow][params.col] = "mario";
      this.setState({mCounter: this.state.mCounter+1});
    } else if(newBlock[nRow][params.col] && newBlock[nRow][params.col] === "emptyBox"){
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[nRow][params.col] = "mario";      
    } 
    this.setState({block: newBlock});
    this.checkWin(this.state.mCounter);
  }
  
  moveRight = (e) => {
    const newBlock = Object.assign({}, this.state.blocks);
    let params = this.getParams(e);
    let nCol = params.col+1;
    if(nCol === newBlock[params.row].length && !newBlock[params.row][nCol]){
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[params.row][0] = "mario";
    } else if(newBlock[params.row][nCol] && newBlock[params.row][nCol] === "mushroom") {
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[params.row][nCol] = "mario";
      this.setState({mCounter: this.state.mCounter+1});
    } else if(newBlock[params.row][nCol] && newBlock[params.row][nCol] === "emptyBox"){
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[params.row][nCol] = "mario";      
    } 
    this.setState({block: newBlock});
    this.checkWin(this.state.mCounter);
  }
  
  moveDown = (e) => {
    const newBlock = Object.assign({}, this.state.blocks);
    let params = this.getParams(e);
    let nRow = params.row+1;
    if(nRow === this.props.grid.height){
      newBlock[this.props.grid.height-1][params.col] = "emptyBox";    
      newBlock[0][params.col] = "mario";
    } else if(newBlock[nRow][params.col] && newBlock[nRow][params.col] === "mushroom") {
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[nRow][params.col] = "mario";
      this.setState({mCounter: this.state.mCounter+1});
    } else if(newBlock[nRow][params.col] && newBlock[nRow][params.col] === "emptyBox"){
      newBlock[params.row][params.col] = "emptyBox";
      newBlock[nRow][params.col] = "mario";      
    } 
    this.setState({block: newBlock});
    this.checkWin(this.state.mCounter);
  }
  
  handleOnKeyPress = (e) => {
    switch(e.keyCode) {
      case 37:
        this.moveLeft(e);
        break;
      case 38:
        this.moveUp(e);
        break;
      case 39:
        this.moveRight(e);
        break;
      case 40:
        this.moveDown(e);
        break;        
    }
  }
  
  componentDidMount(){
    document.addEventListener("keydown", this.handleOnKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  } 
  componentWillMount() {
     let blocks = generateGrid(this.props.grid.width, (this.props.grid.height * this.props.grid.width));
     this.setState({ blocks: blocks });
  }

  render() {
  
    let divStyle = {
      width:(this.props.grid.width*40)+2,
      "marginLeft": "30%"
    }; 
 
    return (
    <div className="gameGrid" style={divStyle}>
      {
      this.state.blocks.map((row, i) => 
        <div key={i} className="rowDiv">
          
          {
          row.map((box, j)=>
            <div key={i+""+j} id={i+"_"+j} className={box} onKeyPress={(e) => {this.handleOnKeyPress(e)}}></div>
          )
          }
          
        </div>
      )
      }
    </div>
    )
  }
}


ReactDOM.render(<MarioAndMushroom />, document.querySelector("#app"));
