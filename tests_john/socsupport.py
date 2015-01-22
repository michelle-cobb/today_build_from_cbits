#!/cygdrive/c/Python27/python.exe
# vim:ts=4:sw=4:sts=4:expandtab:sr:autoindent:smartindent

# -*- coding: utf-8 -*-
import os, sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

debugoutput = 0

def debugprint(msg):
    if debugoutput == 0:
        return
    print msg

class Socsupport(unittest.TestCase):
    def setUp(self):
        debugprint("...setUp")
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True
        self.maxDiff = None

        # count how many iterations we run
        self.iteration = 0

        # count assert passes/fails
        self.asserts_passed = 0
        self.asserts_failed = 0

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
        self.practical_responses = ["You're satisfied with the practical support available to you, but it looks like you have few people you can turn to when you need that support and that you aren't super confident that you can get it when you need it.\nConsider who you might be able to build a relationship with that might offer practical support, and how you might spend more time with supportive people to strengthen those relationships. Being able to receive practical support when you need it is important!", "It looks like you have few people you can turn to when you need practical support and that you aren't super confident that you can get this support when you need it. You also say you aren't satisfied with this situation!\nConsider who you might be able to build a relationship with that might offer practical support, and how you might spend more time with supportive people to strengthen those relationships. Being able to receive practical support when you need it is important!", "It looks like you have several people you can turn to when you need practical support and that you are satisfied with the support available to you, but you aren't super confident that you can get that support when you need it.\nConsider how you might spend more time with supportive people to strengthen those relationships so you can be more confident they will be there when you need them. Being able to receive practical support when you need it is important!", "It looks like you have several people you can turn to when you need practical support but that you aren't super confident that you can get that support when you need it and you aren't satisfied with this.\nConsider how you might spend more time with supportive people to strengthen those relationships so you can be more confident they will be there when you need them. Being more confident in your support network may help you feel more satisfied. Being able to receive practical support when you need it is important!", "It looks like you are very confident you can get practical support when you need it and that you are satisfied with the support available to you, but that you don't have a large variety of people you can turn to for this kind of support.\nConsider who you might be able to build a relationship with that might offer another source of practical support. Being able to receive practical support when you need it is important!", "It looks like you are very confident you can get practical support when you need it but that you aren't satisfied with the support available to you and you don't have a large variety of people you can turn to for this kind of support.\nConsider who you might be able to build a relationship with that might offer another source of practical support. Having a larger support network may help you feel more satisfied. Being able to receive practical support when you need it is important!", "It looks like you are very confident you can get practical support when you need it, you're satisfied with the support available to you, and you have a variety of people you can turn to for this kind of support.\nThat's great! Remembering that this support is there for you when you need it is important!", "It looks like you are very confident you can get practical support when you need it, you have a variety of people you can turn to for this kind of support, but you aren't satisfied with the support available to you.\nThink about why you aren't satisfied and how you could build new relationships or strengthen existing ones to make your support network feel more satisfying to you. Being able to receive practical support when you need it is important!"]

        self.emotional_responses = ["It doesn't look like you have too many people you can turn to when you need emotional support and you aren't that confident you can get it when you need it.\nSo, even though you're satisfied with what you have, you might want to think about ways you could develop more relationships that could offer you emotional support or how you could spend more time with supportive people to strengthen those ties. You deserve to have people you can turn to for emotional support when you need it!", "It doesn't look like you have too many people you can turn to when you need emotional support and you aren't that confident you can get it when you need it.\nEspecially since you feel unsatisfied with this level of support, you might want to think about ways you could develop more relationships that could offer you emotional support or how you could spend more time with supportive people to strengthen those ties. You deserve to have people you can turn to for emotional support when you need it!", "The good news is you have several people you can turn to when you need emotional support and you're satisfied with the level of emotional support available to you.\nHowever, it doesn't seem like you're confident that you can always get this support when you need it. Think about who you might spend more time with to strengthen relationships that provide you with emotional support. This will help you build confidence that emotional support will be available to you when you need it!", "The good news is you have several people you can turn to when you need emotional support. But it doesn't seem like you're confident that you can get this support when you need it, and you are not satisfied with this situation.\nThink about who you might spend more time with to strengthen relationships that provide you with emotional support. This will help you build confidence that emotional support will be available to you when you need it! That boost in confidence may help you feel more satisfied with your sources of emotional support.", "You are confident you can get the emotional support you need when you need it and you feel satisfied with that situation. However, you don't report having very many people you can turn to when you need this kind of support.\nThink about people you can build relationships with who are likely to be good sources of emotional support for you in the future. Even though you are satisfied with your emotional support at this time, emotional support is so important that it's worth the effort to build up a variety of people you can turn to when you need it.", "You are confident you can get the emotional support you need when you need it. However, you don't report having very many people you can turn to when you need this kind of support and you find that unsatisfactory.\nIt may be hard since you do feel confident you can get this support when you need it, but think about people you can build relationships with who are likely to be good sources of emotional support for you in the future. Finding more sources of emotional support should help you feel more satisfied.", "You have a variety of people you can turn to for emotional support, you're satisfied with this support, and you feel confident you can get it when you need it.\nYou're doing well in this area! Remember that this support is there when you need it.", "You have a variety of people you can turn to for emotional support, and you feel confident you can get it when you need it.\nThink about why you're still unsatisfied with this support and see what you can do make it feel more satisfying to you. Maybe you'd like to spend more time with the people who give you emotional support, and strengthen those ties. Or, maybe you'd like to build some new relationships--different people will give you emotional support in different ways, and you might be craving a new type of emotional connection."]

        self.belonging_responses = ["It's always important to feel like you can fit in and belong somewhere. You're satisfied with your belonging support, but you don't have many sources you can turn to for this kind of support and you don't seem completely confident you can get it when you need it.\nAre there people in your life who accept you just the way you are? If so, you could develop or deepen those relationships by spending some more time with those people. You could also volunteer or join organizations or clubs where you have a better chance of meeting like-minded people, so that you have more people who can provide you with belonging support.", "It's always important to feel like you can fit in and belong somewhere, but you don't feel satisfied with the belonging support available to you. It doesn't seem like you have many sources you can turn to for this kind of support and you don't seem completely confident you can get it when you need it.\nAre there people in your life who accept you just the way you are? If so, you could develop or deepen those relationships by spending some more time with those people. You could also volunteer or join organizations or clubs where you have a better chance of meeting like-minded people!", "It's great that you feel like you belong around a variety of people and are satisfied with the level of belonging support available to you. Still, it sounds like you aren't fully confident you can get this support when you need it.\nTake a few moments to consider who you could spend more time with to strengthen relationships that really make you feel like you belong. Doing so will increase your confidence that this support will be there when you need it most!", "It's great that you feel like you belong around a variety of people. Still, it sounds like you aren't fully confident you can get this support when you need it, and you're not completely satisfied with the level of support available to you.\nTake a few moments to consider who you could spend more time with to strengthen relationships that really make you feel like you belong. Doing so will increase your confidence that this support will be there when you need it most! Being confident that this support is available to you should also help you feel more satisfied.", "You're satisfied with the level of belonging support available to you and confident you can get it when you need it. That's great! However, you don't seem to have a variety of different people you can turn to for this support when you need it.\nIt's important to always feel like you belong somewhere, and having more people you can identify with will make this possible more of the time. Even though you feel confident about this support, think about other people who accept you just the way you are or share common interests with you, who you could build relationships with. These people are likely to be good sources of belonging support in the future.", "You're confident you can get belonging support when you need it. That's great! However, you don't seem to have a variety of different people you can turn to for this support when you need it, and you're not fully satisfied with the level of belonging support available to you.\nIt's important to always feel like you belong somewhere and having more people you can identify with will make this possible more of the time. Even though you feel confident about this support, think about other people who accept you just the way you are or share common interests with you, who you could build relationships with. These people are likely to be good sources of belonging support in the future.", "There are many people you feel like you belong around, and you're confident that you can get belonging support when you need it. Understandably, you are satisfied with this support.\nYou're doing great here! Remember that this support is there for you when you need to feel like you belong!", "There are many people you feel like you belong around, and you're confident you can get belonging support when you need it. However, you don't feel completely satisfied with the level of support available to you.\nSee if you can figure out what you need to do to feel more satisfied with this support. Do you want to spend more time with the people that give you belonging support? Or perhaps there are parts of your identity that you feel are important, but you have not felt comfortable sharing with your support network? If so, you could try volunteering or joining organizations where you could meet new people who have more in common with you!"]

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

    def outputStats(self):
        print "Assert fails: %d, successes: %d" % (self.asserts_failed, self.asserts_passed)

    def incrementPassedAsserts(self):
        self.asserts_passed += 1
        return self.asserts_passed

    def incrementFailedAsserts(self):
        self.asserts_failed += 1
        return self.asserts_failed

    def assertContains(self, string, substring):
        debugprint("...assertContains")
        return self.assertTrue(substring in string)

    def test_socsupport(self):
        debugprint("...test_socsupport")
        # loop through all combinations that we need to test
        for sat in range(2):
            for con in range(5):
                for num in range(3):
                    self.social_support_tool_runthrough(sat,con,num)

    def social_support_tool_runthrough(self, sat, con, num):
        debugprint("...social_support_tool_runthrough")
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
        driver.get(self.base_url)
        driver.get(self.base_url)

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
        prac_index = self.response_map[(sat,con,num)]
        prac_match = self.practical_responses[prac_index]
        print "checking practical support feedback..."

        #time.sleep(2)

        # and now make sure things match!
        try:
            self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, prac_match)
            self.incrementPassedAsserts()
            debugprint("...all is well!")
        except AssertionError as e:
            self.incrementFailedAsserts()
            self.verificationErrors.append("practical feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,prac_index,str(e)))
            print "======================================================================"
            print "practical feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,prac_index,str(e))
            print "GOT   :" + driver.find_element_by_css_selector("#simplemodal-data").text
            print "WANTED:" + prac_match
            print "======================================================================"

        self.outputStats()

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
        emo_index = self.response_map[(sat,con,num)]
        emo_match = self.emotional_responses[emo_index]

        print "checking emotional support feedback..."
        
        #time.sleep(2)

        # and check our response
        try:
            self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, emo_match)
            self.incrementPassedAsserts()
            debugprint("...all is well!")
        except AssertionError as e:
            self.incrementFailedAsserts()
            self.verificationErrors.append("emotional feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,emo_index,str(e)))
            print "======================================================================"
            print "emotional feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,emo_index,str(e))
            print "GOT   :" + driver.find_element_by_css_selector("#simplemodal-data").text
            print "WANTED:" + emo_match
            print "======================================================================"

        self.outputStats()

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
        bel_index = self.response_map[(sat,con,num)]
        bel_match = self.belonging_responses[bel_index]

        print "checking belonging support feedback..."

        #time.sleep(2)

        try:
            self.assertContains(driver.find_element_by_css_selector("#simplemodal-data").text, bel_match)
            self.incrementPassedAsserts()
            debugprint("...all is well!")
        except AssertionError as e:
            self.incrementFailedAsserts()
            self.verificationErrors.append("belonging feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,bel_index,str(e)))
            print "======================================================================"
            print "belonging feedback sat:%d con:%d num:%d did not match response %d: %s" % (sat,con,num,bel_index,str(e))
            print "GOT   :" + driver.find_element_by_css_selector("#simplemodal-data").text
            print "WANTED:" + bel_match
            print "======================================================================"

        self.outputStats()

        # finish up...
        driver.find_element_by_link_text("Finish").click()

        # click how we want to improve our confidence
        driver.find_element_by_id(self.imp_con[imp]).click()

        # and return home to complete test
        driver.find_element_by_name("homeButton").click()
    
    def is_element_present(self, how, what):
        debugprint("...is_element_present")
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        debugprint("...is_alert_present")
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        debugprint("...close_alert_and_get_its_text")
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
        debugprint("...tearDown")
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    # reopen stdout with unbuffered output
    sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 0)
    debugprint("...__main__...calling unittest.main()")
    unittest.main()

