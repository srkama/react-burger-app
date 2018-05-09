import React, { Component } from 'react';
import classes from './input.css'

class Input extends Component {

    state = {}

    getInput = () => {
        const elementType = this.props.elementType;
        let inputClasses = [];
        if (!this.props.valid){
            inputClasses.push(classes.inValid);
        }
        
        if(elementType === "text") {
            return  <input 
                        type='text'
                        className = {inputClasses.join(' ')}
                        placeholder={this.props.config.placeholder} 
                        value={this.props.config.value} 
                        onChange={this.props.onChange}/>

        } else if (elementType === "textarea") {
            return <textarea 
                        className = {inputClasses.join(' ')}
                        value={this.props.config.value} 
                        onChange={this.props.onChange}></textarea>

        } else if (elementType === "select") {
            return (
                    <select className = {inputClasses.join(' ')} value={this.props.config.value} onChange={this.props.onChange}>
                        {
                            this.props.config.values.map((item,key)=>{
                                return <option key={key} value={item.value}>{item.display}</option>
                            })
                        }
                    </select>)

        } else {
            return <input 
                        type='text' 
                        className = {inputClasses.join(' ')}
                        placeholder={this.props.config.placeholder} 
                        value={this.props.config.value} 
                        onChange={this.props.onChange}/>
                        
        }
    }

    render() {
        let inputClasses= [classes.input, ]
        let errorMessageClass = classes.hide;
        if (!this.props.valid){
            inputClasses.push(classes.errorInput);
            errorMessageClass = "";
        }
        
        return(
            <div className={inputClasses.join(' ')}>
                <div>
                <label>{this.props.config.label}</label>
                </div>
                <div>
                  {this.getInput()}
                  <span className={errorMessageClass}>Error in the field!</span>
                </div>
            </div>
        )
    }
}


export default Input;