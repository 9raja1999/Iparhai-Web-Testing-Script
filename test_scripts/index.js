const { Builder, By, Key, withTagName } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('C:/Users/NUCES/Desktop/iparhai_web_testing/node_modules/selenium-webdriver/chromedriver.exe');
const driver = new Builder().forBrowser('chrome').setChromeService(service).build();


const delay = ms => new Promise(res => setTimeout(res, ms))

const elementExists = (xpath) => {
    try {
        driver.findElement(By.xpath(xpath))
    } catch (e) {
        return false
    }
    return true
}

const FinishButton = (d, i) => {


    driver.wait(() => { console.log('Waiting') }, 10000);
    driver.findElement(By.xpath(`/html/body/div[6]/div[2]/div/form/div/div[2]/input`))
        .then(found => {

            driver.findElement(By.xpath(`//html/body/div[6]/div[2]/div/form/div/div[2]/input`)).click();
            driver.findElement(By.xpath(`//*[@id="storeAns2"]`)).click()



        })
        .catch(notfound => {
            console.log('Options Not found', notfound)
            console.log('Counter', i)
        })
}

const doSomething = (driver, counter) => {
    console.log(counter)
    // let limit = 0;
    driver.findElement(By.id("storeAns")).then(found => {
        // clicking on Finish test button
        driver.findElement(By.id("storeAns")).click();

        driver.wait(()=>{
            // clicking on cross button
            console.log('Final Screen');
            driver.findElement(By.xpath("/html/body/div[6]/div[1]/a[2]/i")).click();
        },1000);
    }).catch(notFound => {
        

        setTimeout(() => {
            FinishButton(driver, counter++)
            doSomething(driver, counter++)
        }, 3000);
    })

    // setTimeout(doSomething(driver, counter ?), 3000, ++counter);
}

async function startTesting(driver) {

    // let driver = await new Builder().forBrowser("chrome").build();


    await driver.get("https://iparhai.com/iParhai/Login/");

    console.log('On sign up page');

    try {
        setTimeout(() => {
            driver.findElement(By.xpath(`//*[@id="bg"]/div[5]/form/input[1]`)).sendKeys('k225219@nu.edu.pk');
            driver.findElement(By.xpath(`//*[@id="bg"]/div[5]/form/input[2]`)).sendKeys('12345');
            console.log('Elements Added');
            setTimeout(async () => {
                let startLearning = driver.findElement(By.xpath(`//*[@id="bg"]/div[5]/form/button`));
                console.log('Start Learning');
                startLearning.click();

                setTimeout(async () => {
                    let enrollCourses = await driver.findElement(By.xpath(`//*[@id="showVfNo"]/div/div[10]/a`));
                    enrollCourses.click()

                    setTimeout(async () => {
                        // Enrolling Courses
                        console.log('Selecting Grade3');
                        // Selecting Grade3 but it is Selecting Grade5
                        await driver.findElement(By.xpath(`//*[@id="gradeIds"]`)).click();

                        await driver.findElement(By.xpath(`//*[@id="gradeIds"]/option[4]`)).click();

                        console.log('Selecting Curriculum');
                        await driver.findElement(By.xpath(`//*[@id="subjectIds"]`)).click();
                        await driver.findElement(By.xpath(`//*[@id="grds1"]`)).click();

                        console.log('Selecting Language')
                        await driver.findElement(By.xpath(`//*[@id="curriculumIds"]`)).click();
                        await driver.findElement(By.xpath(`//*[@id="subs1"]`)).click();

                        console.log('Click on enroll Button')
                        await driver.findElement(By.xpath(`//*[@id="bg"]/div[5]/form/div/div[5]/button`)).click();

                        setTimeout(async () => {
                            await driver.switchTo().alert().accept()

                            setTimeout(async () => {
                                //course already enrolled so going to courses page
                                console.log('Clicking on Courses tab')
                                await driver.findElement(By.xpath(`//*[@id="showVfNo"]/div/div[4]/a`)).click();

                                setTimeout(async () => {
                                    // View Course card click button
                                    console.log('Clicking on View Course button')
                                    await driver.findElement(By.xpath(`//*[@id="courses"]/div[3]/div/div/div[2]/table[2]/tbody/tr/td[2]/a`)).click();
                                    console.log('Now Clicked');

                                    setTimeout(async () => {
                                        try {
                                            let options = [
                                                `//*[@id="questionsWrap"]/div[2]/input`,
                                                `//*[@id="questionsWrap"]/div[3]/input`,
                                                `//*[@id="questionsWrap"]/div[4]/input`,
                                                `//*[@id="questionsWrap"]/div[5]/input`
                                            ];
                                            // let randomOption = options[Math.floor(Math.random() * options.length)];
                                            let randomOption = `//*[@id="questionsWrap"]/div[1]/input`;

                                            // clicking on continue learning button
                                            await driver.findElement(By.xpath(`//*[@id="cntLrn"]`)).click();

                                            setTimeout(async () => {
                                                // start Assessment
                                                console.log('startAssessment')
                                                let StartAssessmentisPresent = elementExists(`//*[@id="videoLog"]/button[1]`);
                                                let FinistTestisPresent = elementExists(`//*[@id="storeAns"]`);
                                                let optionsArePresent = elementExists(randomOption);


                                                await driver.findElement(By.xpath(`//*[@id="videoLog"]/button[1]`)).then(found => {
                                                    console.log('Start Assessment Button Found');
                                                    driver.findElement(By.xpath(`//*[@id="videoLog"]/button[1]`)).click();


                                                    doSomething(driver, 0)
                                                   
                                                }).catch(notFound => {
                                                    console.log('Start Assessment button not found')
                                                    try {
                                                        

                                                        doSomething(driver, 0)

                                                    } catch (e) {
                                                        console.log(e)
                                                    }
                                                })
                                            })



                                        } catch (e) {
                                            console.log("Exception Generated", e)
                                        }
                                    }, [3000])
                                }, 3000);


                            }, [3000])
                        }, [3000])
                    }, 3000);
                }, 3000);




            }, [3000])
        }, 6000)
    } catch (e) {
        console.log("Exception", e)
    }
}

startTesting(driver)