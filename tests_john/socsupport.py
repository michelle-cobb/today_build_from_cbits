# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Socsupport(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True
#	self.maxDiff = None
    
    def test_socsupport(self):
        driver = self.driver
        # warning: this test may fail if you run it at too high a speed!  Slow the test down a bit for this one.
        driver.get("http://localhost:8080/")
        driver.find_element_by_xpath("//div[@id='mainContainer']/div/div[4]/h3").click()
        driver.find_element_by_css_selector("i.icon-heart-empty").click()
        driver.find_element_by_name("nextButton").click()
        driver.find_element_by_id("supportPrac-0").click()
        driver.find_element_by_id("satisfiedPrac-1").click()
        driver.find_element_by_id("numPrac-2").click()
        driver.find_element_by_name("nextButton").click()

	matchstring1 = "It looks like you have few people you can turn to when you need practical support and that you aren’t super confident that you can get this support when you need it. You also say you aren’t satisfied with this situation!"

	time.sleep(2)
        try: self.assertEqual(matchstring1.decode('ISO-8859-1'), driver.find_element_by_css_selector("#simplemodal-data > p").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_link_text("Move on to look at Emotional Support").click()
        driver.find_element_by_id("supportEmot-1").click()
        driver.find_element_by_id("peopleEmot-1").click()
        driver.find_element_by_id("satisfiedEmot-1").click()
        driver.find_element_by_id("numEmot-0").click()
        driver.find_element_by_name("nextButton").click()

	matchstring2 = "It doesn’t look like you have too many people you can turn to when you need emotional support and you aren’t that confident you can get it when you need it."

	time.sleep(2)
        try: self.assertEqual(matchstring2.decode('ISO-8859-1'), driver.find_element_by_css_selector("#simplemodal-data > p").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_link_text("Move on to look at Belonging Support").click()
        driver.find_element_by_id("supportBelong-2").click()
        driver.find_element_by_id("peopleBelong-1").click()
        driver.find_element_by_id("peopleBelong-4").click()
        driver.find_element_by_id("satisfiedBelong-1").click()
        driver.find_element_by_id("numBelong-1").click()
        driver.find_element_by_name("nextButton").click()

	matchstring3 = "It’s great that you feel like you belong around a variety of people. Still, it sounds like you aren’t fully confident you can get this support when you need it, and you’re not completely satisfied with the level of support available to you."

	time.sleep(2)
        try: self.assertEqual(matchstring3.decode('ISO-8859-1'), driver.find_element_by_css_selector("#simplemodal-data > p").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_link_text("Finish").click()
        driver.find_element_by_id("improveSupport-1").click()
        driver.find_element_by_id("improveSupport-0").click()
        driver.find_element_by_name("homeButton").click()
    
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
