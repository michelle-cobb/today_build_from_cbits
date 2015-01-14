#!/cygdrive/c/Python27/python.exe
# vim:ts=4:sw=4:sts=4:expandtab:sr:autoindent:smartindent

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
        # print "...setUp"
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True
        # self.maxDiff = None

        # count how many iterations we run
        self.iteration = 0

        # these are all the options for the social support pages, that we will be selecting to test
        self.prac_con = [ "supportPrac-0", "supportPrac-1", "supportPrac-2", "supportPrac-3", "supportPrac-4" ]
        self.prac_src = [ "peoplePrac-0", "peoplePrac-1", "peoplePrac-2", "peoplePrac-3", "peoplePrac-4" ]
        self.prac_sat = [ "satisfiedPrac-0", "satisfiedPrac-1" ]
        self.prac_num = [ "numPrac-0", "numPrac-1", "numPrac-2" ]
        self.emo_con = [ "supportEmot-0", "supportEmot-1", "supportEmot-2", "supportEmot-3", "supportEmot-4" ]
        self.emo_src = [ "peopleEmot-0", "peopleEmot-1", "peopleEmot-2", "peopleEmot-3", "peopleEmot-4" ]
        self.emo_sat = [ "satisfiedEmot-0", "satisfiedEmot-1" ]
        self.emo_num = [ "numEmot-0", "numEmot-1", "numEmot-2" ]
        self.bel_con = [ "supportBelong-0", "supportBelong-1", "supportBelong-2", "supportBelong-3", "supportBelong-4" ]
        self.bel_src = [ "peopleBelong-0", "peopleBelong-1", "peopleBelong-2", "peopleBelong-3", "peopleBelong-4" ]
        self.bel_sat = [ "satisfiedBelong-0", "satisfiedBelong-1" ]
        self.bel_num = [ "numBelong-0", "numBelong-1", "numBelong-2" ]
        self.imp_con = [ "improveSupport-0", "improveSupport-1", "improveSupport-2" ]

        # there are eight possible responses for each meaningful combination of sat, con, num
        self.practical_responses = [ "", "", "", "", "", "", "", "" ]
        self.emotional_responses = [ "", "", "", "", "", "", "", "" ]
        self.belonging_responses = [ "", "", "", "", "", "", "", "" ]

        # response_map is a dictionary keyed on combinations of sat, con, num
        # each is paired with a value indicating the array index where the match string
        # appropriate to this combination of options will be found
        self.response_map = dict([
            ((0,0,0), 0), ((0,0,1), 2), ((0,0,2), 0), ((0,1,0), 0), ((0,1,1), 2),
            ((0,1,2), 0), ((0,2,0), 0), ((0,2,1), 2), ((0,2,2), 0), ((0,3,0), 4),
            ((0,3,1), 6), ((0,3,2), 4), ((0,4,0), 4), ((0,4,1), 6), ((0,4,2), 4),
            ((1,0,0), 1), ((1,0,1), 3), ((1,0,2), 1), ((1,1,0), 1), ((1,1,1), 3),
            ((1,1,2), 1), ((1,2,0), 1), ((1,2,1), 3), ((1,2,2), 1), ((1,3,0), 5),
            ((1,3,1), 7), ((1,3,2), 5), ((1,4,0), 5), ((1,4,1), 7), ((1,4,2), 5)
            ])
        # this is where these values come from per the original logic
        # [0] sat:yes(0) conf:notatall(0),alittle(1),some(2) variety:none(0),1or2(2)
        # [1] sat:no(1) conf:notatall(0),alittle(1),some(2) variety:none(0),1or2(2)
        # [2] sat:yes(0) conf:notatall(0),alittle(1),some(2) variety:variety(1)
        # [3] sat:no(1) conf:notatall(0),alittle(1),some(2) variety:variety(1)
        # [4] sat:yes(0) conf:alot(3),verymuch(4) variety:none(0),1or2(2)
        # [5] sat:no(1) conf:alot(3),verymuch(4) variety:none(0),1or2(2)
        # [6] sat:yes(0) conf:alot(3),verymuch(4) variety:variety(1)
        # [7] sat:no(1) conf:alot(3),verymuch(4) variety:variety(1)

    def assertContains(self, string, substring):
        # print "...assertContains"
        return self.assertTrue(substring in string)

    def test_socsupport(self):
        # print "...test_socsupport"
        # loop through all combinations that we need to test
        for sat in range(2):
            for con in range(5):
                for num in range(3):
                    self.social_support_tool_runthrough(sat,con,num)

    def social_support_tool_runthrough(self, sat, con, num):
        # print "...social_support_tool_runthrough"
        # go through one cycle of testing with the social support tool

        # increase our counter
        self.iteration += 1

        print "social support tool test number %d: [%d,%d,%d]" % (self.iteration, sat, con, num)

        driver = self.driver
        # warning: this test may fail if you run it at too high a speed!  Slow the test down a bit for this one.

        # set prac_src, emo_src, bel_src to something (randomly? for now always 2 via src)
        src = 2
        # set imp_con to something (randomly? for now always 1 via imp)
        imp = 1

        # this comes up with a blank blue screen the first time, every time. i am not
        # sure if this is a real bug or something odd on my end
        driver.get("http://localhost:8080/")
        driver.get("http://localhost:8080/")

        driver.find_element_by_xpath("//div[@id='mainContainer']/div/div[4]/h3").click()
        driver.find_element_by_css_selector("i.icon-heart-empty").click()
        driver.find_element_by_name("nextButton").click()


        # click the items we've chosen to click this time:
        driver.find_element_by_id(self.prac_con[con]).click()
        driver.find_element_by_id(self.prac_src[src]).click()
        driver.find_element_by_id(self.prac_sat[sat]).click()
        driver.find_element_by_id(self.prac_num[num]).click()

        # and submit...
        driver.find_element_by_name("nextButton").click()

        # get the string we want to match against based on the values we've clicked on
        prac_match = self.practical_responses[ self.response_map[(sat,con,num)] ]

        time.sleep(2)

        # and now make sure things match!
        try: self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, prac_match)
        except AssertionError as e: self.verificationErrors.append(str(e))

        # move on to emotional support
        driver.find_element_by_link_text("Move on to look at Emotional Support").click()

        # again click the items we've chosen this time:
        driver.find_element_by_id(self.emo_con[con]).click()
        driver.find_element_by_id(self.emo_src[src]).click()
        driver.find_element_by_id(self.emo_sat[sat]).click()
        driver.find_element_by_id(self.emo_num[num]).click()

        # and submit...
        driver.find_element_by_name("nextButton").click()

        # get the string we want to match against based on the values we've clicked on
        emo_match = self.emotional_responses[ self.response_map[(sat,con,num)] ]
        
        time.sleep(2)

        # and check our response
        try: self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, emo_match)
        except AssertionError as e: self.verificationErrors.append(str(e))

        # move on to belonging support
        driver.find_element_by_link_text("Move on to look at Belonging Support").click()

        # again click the items we've chosen this time:
        driver.find_element_by_id(self.bel_con[con]).click()
        driver.find_element_by_id(self.bel_src[src]).click()
        driver.find_element_by_id(self.bel_sat[sat]).click()
        driver.find_element_by_id(self.bel_num[num]).click()

        # and submit...
        driver.find_element_by_name("nextButton").click()

        # get the string we want to match against based on the values we've clicked on
        bel_match = self.belonging_responses[ self.response_map[(sat,con,num)] ]

        time.sleep(2)

        try: self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, bel_match)
        except AssertionError as e: self.verificationErrors.append(str(e))

        # finish up...
        driver.find_element_by_link_text("Finish").click()

        # click how we want to improve our confidence
        driver.find_element_by_id(self.imp_con[imp]).click()

        # and return home to complete test
        driver.find_element_by_name("homeButton").click()
    
    def is_element_present(self, how, what):
        # print "...is_element_present"
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        # print "...is_alert_present"
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        # print "...close_alert_and_get_its_text"
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
        # print "...tearDown"
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    # print "...__main__...calling unittest.main()"
    unittest.main()
