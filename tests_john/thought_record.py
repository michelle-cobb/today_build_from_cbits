# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class ThoughtRecord(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_thought_record(self):
        driver = self.driver
	driver.get(self.base_url)
	driver.get(self.base_url)
        driver.find_element_by_css_selector("i.icon-briefcase").click()
        driver.find_element_by_xpath("//div[@id='mainContainer']/div[2]/div[3]/div[3]/div/h3").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_id("situation").clear()
        driver.find_element_by_id("situation").send_keys("I lost my dog")
        Select(driver.find_element_by_id("emotion")).select_by_visible_text("Depressed")
        driver.find_element_by_id("thought").clear()
        driver.find_element_by_id("thought").send_keys("I'll never find him or see him again.")
        driver.find_element_by_id("automaticThought-0").click()
        driver.find_element_by_id("automaticThought-2").click()
        driver.find_element_by_id("automaticThought-6").click()
        driver.find_element_by_id("automaticThought-10").click()
        driver.find_element_by_name("saveButton").click()
        driver.find_element_by_id("alternateThought").clear()
        driver.find_element_by_id("alternateThought").send_keys("I might find him and get him back")
        driver.find_element_by_id("nowAsk").clear()
        driver.find_element_by_id("nowAsk").send_keys("Hopeful")
        driver.find_element_by_name("saveButton").click()
        driver.find_element_by_xpath("(//input[@name='nextButton'])[2]").click()
        try: self.assertEqual("I lost my dog", driver.find_element_by_css_selector("dd").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("I'll never find him or see him again.", driver.find_element_by_xpath("//ul[@id='today-list']/li/dl/dd[2]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("I might find him and get him back", driver.find_element_by_xpath("//ul[@id='today-list']/li/dl/dd[3]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [selectWindow | null | ]]
        driver.find_element_by_id("today-list-icon0").click()
        try: self.assertEqual("I lost my dog", driver.find_element_by_id("situation").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [getSelectedLabel | id=emotion | ]]
        try: self.assertEqual("I'll never find him or see him again.", driver.find_element_by_id("thought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        driver.find_element_by_name("saveButton").click()
        try: self.assertEqual("I might find him and get him back", driver.find_element_by_id("alternateThought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("Hopeful", driver.find_element_by_id("nowAsk").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_css_selector("i.icon-home.icon-4x").click()
        driver.find_element_by_css_selector("i.icon-briefcase").click()
        driver.find_element_by_xpath("//div[@id='mainContainer']/div[2]/div[3]/div[3]/div").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_name("nextButton").click()
        try: self.assertEqual("", driver.find_element_by_id("situation").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("", driver.find_element_by_id("thought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [getSelectedLabel | id=emotion | ]]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        driver.find_element_by_id("situation").clear()
        driver.find_element_by_id("situation").send_keys("I forgot to walk Luna")
        Select(driver.find_element_by_id("emotion")).select_by_visible_text("Anxious")
        driver.find_element_by_id("thought").clear()
        driver.find_element_by_id("thought").send_keys("She's going to get mad and tear up my house.")
        driver.find_element_by_id("automaticThought-1").click()
        driver.find_element_by_id("automaticThought-6").click()
        driver.find_element_by_id("automaticThought-8").click()
        driver.find_element_by_name("saveButton").click()
        try: self.assertEqual("", driver.find_element_by_id("alternateThought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("", driver.find_element_by_id("nowAsk").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_id("alternateThought").clear()
        driver.find_element_by_id("alternateThought").send_keys("There's nothing in my house that Luna hasn't already torn up, so there's nothing to worry about.")
        driver.find_element_by_id("nowAsk").clear()
        driver.find_element_by_id("nowAsk").send_keys("neutral")
        driver.find_element_by_name("saveButton").click()
        driver.find_element_by_xpath("(//input[@name='nextButton'])[2]").click()
        try: self.assertEqual("I lost my dog", driver.find_element_by_css_selector("dd").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("I'll never find him or see him again.", driver.find_element_by_xpath("//ul[@id='today-list']/li/dl/dd[2]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("I might find him and get him back", driver.find_element_by_xpath("//ul[@id='today-list']/li/dl/dd[3]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("I forgot to walk Luna", driver.find_element_by_css_selector("li.Anxious > dl.today-description > dd").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("She's going to get mad and tear up my house.", driver.find_element_by_xpath("//ul[@id='today-list']/li[2]/dl/dd[2]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("There's nothing in my house that Luna hasn't already torn up, so there's nothing to worry about.", driver.find_element_by_xpath("//ul[@id='today-list']/li[2]/dl/dd[3]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [selectWindow | null | ]]
        driver.find_element_by_id("today-list-icon0").click()
        try: self.assertEqual("I lost my dog", driver.find_element_by_id("situation").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [getSelectedLabel | id=emotion | ]]
        try: self.assertEqual("I'll never find him or see him again.", driver.find_element_by_id("thought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        driver.find_element_by_name("saveButton").click()
        try: self.assertEqual("I might find him and get him back", driver.find_element_by_id("alternateThought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("Hopeful", driver.find_element_by_id("nowAsk").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_css_selector("i.icon-home.icon-4x").click()
        driver.find_element_by_css_selector("i.icon-briefcase").click()
        driver.find_element_by_xpath("//div[@id='mainContainer']/div[2]/div[3]/div[3]/div").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_xpath("(//input[@name='nextButton'])[2]").click()
        # ERROR: Caught exception [ERROR: Unsupported command [selectWindow | null | ]]
        driver.find_element_by_id("today-list-icon1").click()
        try: self.assertEqual("I forgot to walk Luna", driver.find_element_by_id("situation").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("She's going to get mad and tear up my house.", driver.find_element_by_id("thought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [getSelectedLabel | id=emotion | ]]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        driver.find_element_by_id("situation").clear()
        driver.find_element_by_id("situation").send_keys("New Situation")
        Select(driver.find_element_by_id("emotion")).select_by_visible_text("\"Blah\"")
        driver.find_element_by_id("thought").clear()
        driver.find_element_by_id("thought").send_keys("New Thought")
        driver.find_element_by_id("automaticThought-1").click()
        driver.find_element_by_id("automaticThought-6").click()
        driver.find_element_by_id("automaticThought-8").click()
        driver.find_element_by_id("automaticThought-3").click()
        driver.find_element_by_id("automaticThought-5").click()
        driver.find_element_by_id("automaticThought-10").click()
        driver.find_element_by_name("saveButton").click()
        try: self.assertEqual("There's nothing in my house that Luna hasn't already torn up, so there's nothing to worry about.", driver.find_element_by_id("alternateThought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("neutral", driver.find_element_by_id("nowAsk").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_id("alternateThought").clear()
        driver.find_element_by_id("alternateThought").send_keys("New Alternate Thought")
        driver.find_element_by_id("nowAsk").clear()
        driver.find_element_by_id("nowAsk").send_keys("New Emotion")
        driver.find_element_by_name("saveButton").click()
        driver.find_element_by_css_selector("i.icon-home.icon-4x").click()
        driver.find_element_by_css_selector("i.icon-briefcase").click()
        driver.find_element_by_xpath("//div[@id='mainContainer']/div[2]/div[3]/div[3]/div").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_xpath("(//input[@name='nextButton'])[2]").click()
        # ERROR: Caught exception [ERROR: Unsupported command [selectWindow | null | ]]
        driver.find_element_by_id("today-list-icon1").click()
        try: self.assertEqual("New Situation", driver.find_element_by_id("situation").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("New Thought", driver.find_element_by_id("thought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        # ERROR: Caught exception [ERROR: Unsupported command [getSelectedLabel | id=emotion | ]]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        # ERROR: Caught exception [Error: locator strategy either id or name must be specified explicitly.]
        driver.find_element_by_name("saveButton").click()
        try: self.assertEqual("New Alternate Thought", driver.find_element_by_id("alternateThought").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("New Emotion", driver.find_element_by_id("nowAsk").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
