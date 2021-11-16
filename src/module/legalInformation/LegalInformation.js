/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../common/Header';
import { OVButton } from '../../components/OVButton';
import OVText, {
    bold,
    medium,
    poppinsBold,
    poppinsLight,
    poppinsMedium,
    poppinsSemiBold,
    small,
} from '../../components/OVText';
import { DOCTOR_1, USER_SMALL } from '../../images';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_100,
    GRAY_800,
    GREEN_COLOR,
    WHITE,
    YELLOW,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const LegalInformation = props => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Legal Information"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Online Vet Video Consultation:
                    </OVText>
                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        A. The Vet Consultants / Groomers/ Trainers &amp; other service providers shall promptly reply
                        to the User after receiving User’s communication. In case of non-compliance with regard to
                        adhering to the applicable laws/rules/regulations/guidelines by the Vet Consultants/
                        Groomers/ Trainers &amp; other service providers, Just For Pet shall have the right to replace
                        such service providers for the purpose of consultation to the User.{'\n'}
                        B. The Vet Consultant further understands that, there is a responsibility on the Vet
                        Consultant to treat the User’s pet, pari passu, as the Vet Consultant would have otherwise
                        treated the pet on a physical one-on-one consultation model.{'\n'}
                        C. The Vet Consultant has the discretion to cancel any consultation at any point in time in
                        cases where the Vet Consultant feels it is beyond his/her expertise or his/her capacity to
                        treat the Pet. In such cases, it may trigger a refund to the User and the User has the option
                        of choosing other Vet Consultants. However, it is strongly recommended that the Vet
                        Consultant advise the User and explain appropriately for next steps which may include
                        referring the User for further evaluation.{'\n'}
                        D. The Vet Consultant is and shall be duly registered, licensed and qualified to practice
                        medicine/ provide health care, wellness services, to non-human animals as per applicable
                        laws/regulations/guidelines set out by competent authorities and the Vet Consultant shall not
                        be part of any arrangement which will prohibit him/her from practicing medicine (to non-
                        human animals) within the territory of India. The Vet Consultant shall at all times ensure that
                        all the applicable laws that govern the Vet Consultant shall be followed and utmost care shall
                        be taken in terms of the consultation/ services being rendered.{'\n'}
                        E. Vet Consultant shall ensure that the consultation online is treated as an in-clinic
                        consultation and provide advice to the best of Vet Consultants’ knowledge.{'\n'}
                        F. The Vet Consultant hereby agrees to Just For Pet’s medical team carrying out an audit
                        of his/her consultations on Consult for the purpose of improving treatment quality, user
                        experience, and other related processes. The Vet Consultant acknowledges that the subject
                        matter of audit may include their personal information. This personal information will be
                        processed in accordance with the Privacy Policy.{'\n'}
                        G. Vet Consultants should provide e-prescriptions to the Users via the prescription module.
                        The Vet Consultant hereby agrees and covenants to be responsible and liable for the
                        content of e-prescription. In addition to any indemnity warranties provided elsewhere in the
                        Agreement, the Vet Consultant hereby agrees to hold Just For Pet, its officers, employees,
                        agents and affiliates harmless from any claims, damages, losses or penalties arising out of
                        any third party claims in connection with the validity of the e-prescription, its content.
                        H. For a Vet Consultant to complete a consultation, it is mandatory to provide a
                        consultation summary via the e-prescription module to all Users.
                        {'\n'}
                        I If Vet Consultant needs to change the status to &#39;unavailable&#39;, the same could be changed
                        after having completed all the open consultations. In case the Vet Consultant leaves a
                        consultation open and changes the status to &#39;unavailable&#39;, the Vet Consultant understands
                        that he shall be liable to pay such penalty as may be imposed by Just For Pet, in these
                        cases.{'\n'}
                        J. The Vet Consultant is not allowed to use any other platform other than “Just For Pet”
                        for the purpose of interacting/communicating with the User and any attempt by the Vet
                        Consultant to interact with the Users through any other external means of communication
                        will amount to violation of this Agreement by the Vet Consultant.{'\n'}
                        K. If the Vet Consultant’s performance on Consult is not compliant with the expected
                        guidelines of Just For Pet or the Vet Consultant is found to be misusing Consult, the Vet
                        Consultant may result in losing the privilege of using Just For Pet platform to provide his
                        veterinary services.{'\n'}
                        L. The Vet Consultant acknowledges that should Just For Pet find the Vet Consultant to
                        be in violation of any of the applicable laws/rules/ regulations/guidelines set out by the
                        Government or Just For pet then Just For Pet shall be entitled to cancel the consultation with
                        such Vet Consultant or take such other legal action as maybe required.{'\n'}
                        M. It is further understood by the Vet Consultant that the information that is disclosed by
                        the User at the time of consultation is personal information and is subject to all applicable
                        privacy laws, shall be confidential in nature and subject to User and Vet Consultant privilege.
                        N. The Vet Consultant understands that Just For Pet makes no promise or guarantee for
                        any uninterrupted communication and the Vet Consultant shall not hold Just For Pet liable, if
                        for any reason the communication is not delivered to the User(s), or are delivered late or not
                        accessed, despite the efforts undertaken by Just For Pet{'\n'}
                        O. The Vet Consultant understands that Just For Pet makes no promise or guarantee for
                        the number of consultations that will be allocated to a Vet Consultant. The consultations
                        allocated to a Vet Consultant will depend upon various factors, which inter-alia includes,
                        Consult response time, User feedback and number of Vet Consultants available, Vet
                        consultant’s experience, Specialization, etc., It is the responsibility of the Vet Consultant to
                        keep a track of their overall performance.{'\n'}
                        P. It shall be the responsibility of the Vet Consultant to ensure that the information
                        provided by User is accurate and not incomplete and understand that Just For Pet shall not
                        be liable for any errors in the information included in any communication between the Vet
                        Consultant and User.{'\n'}
                        Q. The Vet Consultant shall indemnify and hold harmless Just For Pet and its affiliates,
                        subsidiaries, directors, officers, employees and agents from and against any and all claims,
                        proceedings, penalties, damages, loss, liability, actions, costs and expenses (including but
                        not limited to court fees and attorney fees) arising due to the Services provided by Vet
                        Consultant, violation of any law, rules or regulations by the Vet Consultant or due to such
                        other actions, omissions or commissions of the Vet Consultant that gave rise to the claim
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Vet Appointment Booking, Vaccination &amp; Doorstep Vet Consultation:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        A. The Vet Consultants / Clinics shall promptly reply to the User after receiving User’s
                        communication. In case of non-compliance with regard to adhering to the applicable
                        laws/rules/regulations/guidelines by the Vet Consultants/Clinics, Just For Pet shall have the
                        right to replace such service providers for the purpose of consultation to the User.
                        B. The Vet Consultant further understands that, there is a responsibility on the Vet
                        Consultant to treat the User’s pet ,on the same level, as the Vet Consultant would have
                        otherwise treated the pet on a physical one-on-one consultation model.{'\n'}
                        C. The Vet Consultant has the discretion to cancel any consultation at any point in time in
                        cases where the Vet Consultant feels it is beyond his/her expertise or his/her capacity to
                        treat the Pet. In such cases, it may trigger a refund to the User and the User has the option
                        of choosing other Vet Consultants. However, it is strongly recommended that the Vet
                        Consultant advise the User and explain appropriately for next steps which may include
                        referring the User for further evaluation.{'\n'}
                        D. The Vet Consultant is and shall be duly registered, licensed and qualified to practice
                        medicine/ provide health care, wellness services, to non-human animals as per applicable
                        laws/regulations/guidelines set out by competent authorities and the Vet Consultant shall not
                        be part of any arrangement which will prohibit him/her from practicing medicine (to non-
                        human animals) within the territory of India. The Vet Consultant shall at all times ensure that
                        all the applicable laws that govern the Vet Consultant shall be followed and utmost care shall
                        be taken in terms of the consultation/ services being rendered.{'\n'}
                        E. Vet Consultants should provide physical prescriptions to the Users. The Vet Consultant
                        hereby agrees and covenants to be responsible and liable for the content of prescription. In
                        addition to any indemnity warranties provided elsewhere in the Agreement, the Vet
                        Consultant hereby agrees to hold Just For Pet, its officers, employees, agents and affiliates
                        harmless from any claims, damages, losses or penalties arising out of any third party claims
                        in connection with the validity of the prescription, its content.{'\n'}
                        F. The Vet Consultant is not allowed to use any other platform other than “Just For Pet”
                        for the purpose of interacting/communicating with the User and any attempt by the Vet
                        Consultant to interact with the Users through any other external means of communication
                        will amount to violation of this Agreement by the Vet Consultant.{'\n'}
                        G. The Vet Consultant understands that Just For Pet makes no promise or guarantee for
                        any uninterrupted communication and the Vet Consultant shall not hold Just For Pet liable, if
                        for any reason the communication is not delivered to the User(s), or are delivered late or not
                        accessed, despite the efforts undertaken by Just For Pet{'\n'}
                        H. The Vet Consultant understands that Just For Pet makes no promise or guarantee for
                        the number of appointments for Vet Consultant. The appointments to a Vet will be booked by
                        user depending upon various factors, which inter-alia includes, Distance, Experience,
                        {'\n'}
                        Pricing, Specialization,etc., It is the responsibility of the Vet Consultant to keep a track of
                        their overall performance.{'\n'}
                        I. It shall be the responsibility of the Vet Consultant to ensure that the information
                        provided by User is accurate and not incomplete and understand that Just For Pet
                        shall not be liable for any errors in the information included in any communication
                        between the Vet Consultant and User.{'\n'}
                        J. The default radius for Doorstep service is 7 Km. So, if a veterinarian opts for a
                        doorstep service on his profile, the consultation can be booked by a user within a radius of
                        7km from your set location{'\n'}
                        K. The Vet Consultant shall indemnify and hold harmless Just For Pet and its affiliates,
                        subsidiaries, directors, officers, employees and agents from and against any and all claims,
                        proceedings, penalties, damages, loss, liability, actions, costs and expenses (including but
                        not limited to court fees and attorney fees) arising due to the Services provided by Vet
                        Consultant, violation of any law, rules or regulations by the Vet Consultant or due to such
                        other actions, omissions or commissions of the Vet Consultant that gave rise to the claim
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Grooming &amp; Spa, Pet Boarding, Pet Training Services:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        A. The Groomers, Pet Boarding Centers &amp; Pet Trainers shall promptly reply to the User
                        after receiving User’s communication. In case of non-compliance with regard to
                        adhering to the applicable laws/rules/regulations/guidelines by the service providers,
                        Just For Pet shall have the right to replace such service providers for the purpose of
                        consultation to the User.{'\n'}
                        B. The service providers understand that the consultations booked through Just For Pet
                        platform will be serviced at the quality &amp; service standards at par with the service
                        providers usual services standards. The service provider shall not in any way provide
                        a service quality of inferior standard compared to his offline business channel.
                        C. The service providers shall not contact the customers through any other platform to
                        communicate apart from the app. The service providers shall not snatch the
                        customers of Just For Pet from business and approach them from their end. Any
                        such violation shall result in deactivating the service provider’s account and the
                        associated payment settlement will also be halted.{'\n'}
                        D. The service provider acknowledges that there are chances of not being qualified
                        enough to do a particular service. Under these circumstances, the service provider
                        should inform Just For Pet and withdraw from the service. If the service provider fully
                        knows that he is not qualified enough and still does the service, any result arising out
                        of such a situation will have the complete responsibility of the service provider and
                        indemnifies Just For Pet against all claims.{'\n'}
                        E. The service provider shall indemnify and hold harmless Just For Pet and its affiliates,
                        subsidiaries, directors, officers, employees and agents from and against any and all
                        {'\n'}
                        claims, proceedings, penalties, damages, loss, liability, actions, costs and expenses
                        (including but not limited to court fees and attorney fees) arising due to the Services
                        provided by the service provider, violation of any law, rules or regulations by the
                        service provider or due to such other actions, omissions or commissions of the
                        service provider that gave rise to the claim{'\n'}
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Refund &amp; Cancellation Policy- For Vendors/Service Providers
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        1. Vendor/Service Provider No Show Policy:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        a. If a Service provider is unable to keep the appointment, the same should be
                        reported in advance.{'\n'}
                        b. Service provide can also request the User to reschedule the meeting, if there are
                        chances for delay in his availability. It shall be at the discretion of the User to
                        reschedule the meeting with the same service provider or another provider
                        c. When a Service Provider doesn’t show up for a confirmed appointment (without
                        having cancelled or rescheduled before appointment time), the Vet shall be marked
                        SPNS for that particular appointment.{'\n'}
                        d. Whenever a Service Provider is marked SPNS, an SMS and email is sent to verify
                        this claim and understand the reason behind the missed appointment.
                        e. Service Provider should respond in the next 5 days after receiving the SMS/email,
                        with the reason.{'\n'}
                        f. Two SPNS are allowed for any service provider per month
                        G If the service provider gets 3 SPNS, their account will be on hold for a period of 1
                        month, they will be unable to do any business through Just For Pet{'\n'}
                        Just For Pet reserves the right to make the final decision in the case of a conflict.

                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        2. Vendor/Service Providers Cancellation Policy:
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Cancellation &amp; Rescheduling by service provider:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        A. Every service provider can cancel the confirmed appointments Thrice a
                        month. There will be no penalty levied for the cancellation.{'\n'}
                        B. From the fourth cancellation, 20% of the booking amount will be levied as
                        penalty. If the number cancellations are more than 10 in a month, the account
                        of such service provider will be on hold for a period of 3 months, he will not be
                        able to carry out business through Just For Pet{'\n'}
                        C. If the service provider wishes to reschedule a confirmed booking, he can send
                        a reschedule request to the user, if accepted the appointment will be
                        rescheduled. If the customer does not wish to reschedule, the booking is
                        considered as cancelled by the Service Provider.{'\n'}
                        D. Rescheduling is an option given to both service provider as well as customer,
                        if the customer requests the service provider to reschedule the appointment
                        to another slot, if the service provider does not wish to reschedule this case
                        will not be considered as cancellation by service provider

                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Cancellation By Customer:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        - 5 hours and more before the scheduled appointment time: 15% of booking
                        amount will be paid to the service provider{'\n'}
                        - 5 hours to 1 hour before the scheduled appointment time: 50% of booking
                        amount will be paid to the service provider{'\n'}
                        - If the appointment is cancelled within 1 hour of booking and the date of
                        booking should be at least 1 day before scheduled date- No amount will be
                        paid to service provider{'\n'}
                        - 1 hour Below &amp; Appointment No show- 70% of booking amount will be paid to
                        the service provider{'\n'}

                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Rescheduling By Customer:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        - If a customer wishes to reschedule a confirmed appointment, he can reschedule it till
                        2 hours before scheduled time if the appointment is for online vet consultation. If the
                        appointment is for any other service, the customer can reschedule it only till 5 hours
                        before the scheduled time.{'\n'}
                        - If a customer rescheduled to the same service provider, the payment will be done to
                        the service provider based on pre agreed rate for that particular service between Just
                        For Pet &amp; the service provider.{'\n'}

                    </OVText>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LegalInformation;
