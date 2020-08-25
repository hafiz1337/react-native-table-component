import React, { Component } from 'react';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';
import { Cell, MyCell } from './cell';
import { sum } from '../utils';

export class Row extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, height, flexArr, textStyle, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];
          return <Cell key={i} data={item} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
        })}
      </View>
    ) : null;
  }
}

export class MyRow extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  static defaultProps = {
    dateColumn: null 
  }

  render() {
    const { data, style, widthArr, height, flexArr, textStyle, objectNames, dateColumn, status, scope, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {objectNames.map((name, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];

          let found = undefined
          if(dateColumn !== null) {
            found = dateColumn.find(element => element === i)
          }

          let myData = data[name]
            
          if(myData !== null) {
            if(found !== undefined) {
              let arr = myData.split('-');
              let get_date = arr[2].split(' ');
        
              let formatedDate = new Date(arr[0], (arr[1]-1), get_date[0])

              let date = formatedDate.getDate() < 10 ? "0"+formatedDate.getDate() : formatedDate.getDate()
              let getMonth = (formatedDate.getMonth()+1) 
              let month = getMonth < 10 ? "0"+getMonth : getMonth

              formatedDate = date +'-'+ month +'-'+ formatedDate.getFullYear()
              myData = formatedDate
            } 
          }

          if(name === 'DateCompletion') {
            
            if(scope !== 'All' && scope !== 'OnShore') {
              if(myData === null) {
                myData = scope
              }
            }
          }

          if(i === (this.props.target) && this.props.target !== null) {
            return <MyCell key={i} data={this.props.myRenderView} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
          } 
          else {
            return <Cell 
              key={i} 
              data={myData} 
              width={wth} 
              height={height} 
              flex={flex} 
              textStyle={textStyle} 
              {...props} 
              />;
          }
          
        })}
      </View>
    ) : null;
  }
}

export class MyRowWithSystem extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  static defaultProps = {
    dateColumn: null,
    systemColumn: null,
  }

  render() {
    const { data, style, widthArr, height, flexArr, textStyle, objectNames, dateColumn, systems, systemColumn, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {objectNames.map((name, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];

          let found = undefined
          if(dateColumn !== null) {
            found = dateColumn.find(element => element === i)
          }

          let system = undefined
          if(systemColumn !== null) {
            system = systemColumn.find(element => element === i)
          }

          let myData = data[name]
          
          if(myData !== null) {
            if(found !== undefined) {

              let arr = myData.split('-');
              let get_date = arr[2].split(' ');
        
              let formatedDate = new Date(arr[0], (arr[1]-1), get_date[0])

              let date = formatedDate.getDate() < 10 ? "0"+formatedDate.getDate() : formatedDate.getDate()
              let getMonth = (formatedDate.getMonth()+1) 
              let month = getMonth < 10 ? "0"+getMonth : getMonth

              formatedDate = date +'-'+ month +'-'+ formatedDate.getFullYear()
              myData = formatedDate
            } 
          }

          if(myData !== null) {
            if(system !== undefined) {
              myData = systems[myData]['SystemNo']
            } 
          }

          if(i === (this.props.target) && this.props.target !== null) {
            return <MyCell key={i} data={this.props.myRenderView} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
          } 
          else {
            return <Cell 
              key={i} 
              data={myData} 
              width={wth} 
              height={height} 
              flex={flex} 
              textStyle={textStyle} 
              {...props} 
              />;
          }
          
        })}
      </View>
    ) : null;
  }
}

export class Rows extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <Row
              key={i}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

export class RowsOfObject extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
              <Row
                key={i}
                data={item}
                widthArr={widthArr}
                height={height}
                flexArr={flexArr}
                style={style}
                textStyle={textStyle}
                {...props}
              />
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  }
});