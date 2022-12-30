import React from 'react';
const Blog = () => {
    return (
        <div className='container mx-auto text-left '>
            <h1 className='font-extrabold text-4xl text-center mb-8'>SOME QUESTION AND ANSWER</h1>

            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    Q1. What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content">
                    <p><img src="https://miro.medium.com/max/720/1*QCtnQp-bLTksAFHJ050zZQ.png" alt="" /> </p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    Q2.How does prototypical inheritance work?
                </div>
                <div className="collapse-content">
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200520193336/Untitled-Diagram108.png" alt="" srcset="" />
                    </p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    Q3. What is a unit test? Why should we write unit tests?
                </div>
                <div className="collapse-content">
                    <p>
                        A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important. In his book "Working Effectively with Legacy Code", author Michael Feathers states that such tests are not unit tests when they rely on external systems: “If it talks to the database, it talks across the network, it touches the file system, it requires system configuration, or it can't be run at the same time as any other test."<br />
                        For Test-Driven Development (TDD), you write unit tests before writing any implementation. This makes your implementation details in your code shorter and easier to understand. In this instance, the best time to write unit tests is immediately. For others, most developers write unit tests after the code's been written.
                        
                    </p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div className="collapse-title text-xl font-medium">
                    Q4. React vs. Angular vs. Vue?
                </div>
                <div className="collapse-content">
                    <p><img src="https://www.angularminds.com/site_data/static/images/angular-react-vue/comparison-angular-react-vue.png" alt="" srcset="" />
                    </p>
                </div>
            </div>
        </div>
    );

};

export default Blog;