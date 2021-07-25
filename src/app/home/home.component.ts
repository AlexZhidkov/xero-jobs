import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  syncContacts(): void {
    console.log("syncContacts");
    this.afs.collection(`tenants`).doc('test').update({
      contacts: [
        {
          "contactID": "58697449-85ef-46ae-83fc-6a9446f037fb",
          "contactStatus": "ACTIVE",
          "name": "132 Collins",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "4bb77692-42d4-4565-85a0-8849eb85e039",
          "contactStatus": "ACTIVE",
          "name": "7-Eleven",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "42771b60-19a7-4692-af81-dd9f9b9362d4",
          "contactStatus": "ACTIVE",
          "name": "ABC Furniture",
          "firstName": "Trish",
          "lastName": "Rawlings",
          "emailAddress": "info@abfl.com",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "4ab343ad-1ebb-4afe-9d48-1814a93c2081",
          "contactStatus": "ACTIVE",
          "name": "ABPA",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e32e2130-3d27-443a-8313-48fffa03cf53",
          "contactStatus": "ACTIVE",
          "name": "Alan Williams",
          "emailAddress": "awilliams@someaddress.co",
          "skypeUserName": "+123demo",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "fb024c1c-897d-4ef5-b446-032177033f24",
          "contactNumber": "dc2ad0580a62b52317df249e91cb7d5b93be589df65161450b",
          "contactStatus": "ACTIVE",
          "name": "Alexander Zhidkov",
          "firstName": "Alexander",
          "lastName": "Zhidkov",
          "emailAddress": "azhidkov@gmail.com",
          "phones": [],
          "updatedDateUTC": "2021-07-18T03:36:54.053Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "92797bd1-e3dc-42c1-b4b5-c2595139a668",
          "contactStatus": "ACTIVE",
          "name": "ASGARD",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "999-900-1213141",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "f65e0ef1-0a6e-4174-a9ea-bc19349b620c",
          "contactStatus": "ACTIVE",
          "name": "ATO",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "123-900-1213141 ",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "14661634-012e-494b-b265-aaf1912617f7",
          "contactStatus": "ACTIVE",
          "name": "Bank",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "571a2414-81ff-4f8f-8498-d91d83793131",
          "contactStatus": "ACTIVE",
          "name": "Bank West",
          "emailAddress": "procteam@bwb.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "cc4db604-9ed8-4eef-8a29-51b5b70496a0",
          "contactStatus": "ACTIVE",
          "name": "Bankrock Station",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "123-901-1234567 ",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "f4076f40-e387-4a2a-8e29-1543a717a6ce",
          "contactStatus": "ACTIVE",
          "name": "Basket Case",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "3e776c4b-ea9e-4bb1-96be-6b0c7a71a37f",
          "contactStatus": "ACTIVE",
          "name": "Bayside Club",
          "firstName": "Bob",
          "lastName": "Partridge",
          "emailAddress": "secretarybob@bsclub.co",
          "skypeUserName": "bayside577",
          "bankAccountDetails": "980 918-03451237",
          "taxNumber": "11 000 111 000",
          "accountsReceivableTaxType": "OUTPUT",
          "accountsPayableTaxType": "INPUT",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e8e9a2c2-3e7e-48ed-8528-c3d61b28f276",
          "contactStatus": "ACTIVE",
          "name": "Bayside Wholesale",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "67d26b93-ccb4-4890-9bf1-284b70ea755d",
          "contactStatus": "ACTIVE",
          "name": "Berry Brew",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "69d3e538-44b3-4e00-a5f6-7dddcb6e0656",
          "contactStatus": "ACTIVE",
          "name": "Blue Winn Polytechnic",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "41a42865-f15a-4fa1-b643-47877608f557",
          "contactStatus": "ACTIVE",
          "name": "Boom FM",
          "emailAddress": "boom@radiooz.co",
          "skypeUserName": "+123demo",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "5f005a09-5ce4-4fb4-8096-e69c18be636e",
          "contactStatus": "ACTIVE",
          "name": "Brunswick Petals",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "5f1d6e65-871c-45ad-8e21-c0ad640148bd",
          "contactStatus": "ACTIVE",
          "name": "Business Savings Bank",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "72dd6a02-396e-42a2-a4d6-cc3fa75dfece",
          "contactStatus": "ACTIVE",
          "name": "Capital Cab Co",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "123-456-7890123",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e1826204-cc0a-42a5-a6d0-4b352d9d5953",
          "contactStatus": "ACTIVE",
          "name": "Carlton Technical Books",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "ca9b9abc-c2dc-4221-8101-31f464d314cc",
          "contactStatus": "ACTIVE",
          "name": "Carruthers & Smale",
          "emailAddress": "",
          "skypeUserName": "+123demo",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "87e96272-7ba4-432e-b90a-0be3c7f323d4",
          "contactStatus": "ACTIVE",
          "name": "Central Copiers",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "8bb6931d-2865-44e9-9a23-ed1fb9c7a46c",
          "contactStatus": "ACTIVE",
          "name": "Central Documentation Services",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "79aa39ca-22b0-42c2-9026-78757a29d665",
          "contactStatus": "ACTIVE",
          "name": "City Ambassadors Association",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "0a4cf37b-a1a8-4753-9ee2-f9207f63a8ff",
          "contactStatus": "ACTIVE",
          "name": "City Limousines",
          "firstName": "Scott",
          "lastName": "Mercer",
          "emailAddress": "scott@citylimousines.com",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "c135f994-01e4-427b-9e15-acfe8a477c16",
          "contactStatus": "ACTIVE",
          "name": "Cube Land",
          "emailAddress": "info@cubeland.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "1c40da58-fe1d-4e97-b729-b2abdae94d9e",
          "contactStatus": "ACTIVE",
          "name": "David Jones",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "b2b5333a-2546-4975-891f-d71a8a640d23",
          "contactStatus": "ACTIVE",
          "name": "Dick Smith",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "860b99a9-0958-4c8d-a98f-bb1f092b16bb",
          "contactStatus": "ACTIVE",
          "name": "DIISR - Small Business Services",
          "firstName": "Sheree",
          "lastName": "Bond",
          "emailAddress": "accounts@diisr.govt",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "55044e0b-cecb-4a36-9b7b-87500987e11e",
          "contactStatus": "ACTIVE",
          "name": "Dimples Warehouse",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e3a68332-d322-4816-8678-73a537c8cd33",
          "contactStatus": "ACTIVE",
          "name": "Dusty Road Cabs",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "2faccd41-935e-40aa-b74e-e2fc28ac34c3",
          "contactStatus": "ACTIVE",
          "name": "Gable Print",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "59168a21-87be-4be6-988f-a913050d4fa5",
          "contactStatus": "ACTIVE",
          "name": "Gateway Motors",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "1b2be6e9-8d58-4da9-aaf8-4fe5471b653c",
          "contactStatus": "ACTIVE",
          "name": "Hamilton Smith Pty",
          "firstName": "",
          "lastName": "",
          "emailAddress": "infodemo@hsmithdemo.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "fb078879-5d6d-474f-825f-61dc90689349",
          "contactStatus": "ACTIVE",
          "name": "Heritage Trust",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "3fc1fc6c-e5ff-4e40-b6f3-7eb535637d87",
          "contactStatus": "ACTIVE",
          "name": "Kinnet & Jones",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "60d578d9-3e10-4aef-b5dc-9d9fd60a3633",
          "contactStatus": "ACTIVE",
          "name": "Macdonnell Spring and Associates",
          "emailAddress": "info@msa.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "ef6f54c1-eb45-4956-b8cd-1be82ad665f2",
          "contactStatus": "ACTIVE",
          "name": "Maddox Publishing Group",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "1975b0ed-b7ba-4c61-bae8-2aa6d78b0dee",
          "contactStatus": "ACTIVE",
          "name": "Marine Systems",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "fc39b273-4aa2-4785-99ca-24672f6c0000",
          "contactStatus": "ACTIVE",
          "name": "Marriot Outback",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "dbb1f0b5-a71b-4458-8462-104acd0fec6b",
          "contactStatus": "ACTIVE",
          "name": "MCO Cleaning Services",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "17465072-6fa3-40bf-bc42-97765d9e1bea",
          "contactStatus": "ACTIVE",
          "name": "Melbourne Mags",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "d6a384fb-f46f-41a3-8ac7-b7bc9e0b5efa",
          "contactStatus": "ACTIVE",
          "name": "Melrose Parking",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "936c9759-01da-4063-b472-424ab9f48212",
          "contactStatus": "ACTIVE",
          "name": "Mitchell River Lodge",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "31af01e7-2ca7-45b9-a500-b02db996568e",
          "contactStatus": "ACTIVE",
          "name": "Mobil",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "be9f3aab-52f5-4d9c-94b4-87f7d9e5ee8b",
          "contactStatus": "ACTIVE",
          "name": "NAB",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "0e584570-b3ed-4d32-8b28-c0fe4fa19270",
          "contactStatus": "ACTIVE",
          "name": "Negroni's Cafe",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "abf272dd-6b1d-4829-af88-c57bf55855e3",
          "contactStatus": "ACTIVE",
          "name": "Net Connect",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "234-567-8901234",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "812d4f28-1681-4241-8e34-d15c5520ba35",
          "contactStatus": "ACTIVE",
          "name": "Odette Garrison",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "cce9b044-be4a-43b3-9dc7-c027d8dd35b2",
          "contactStatus": "ACTIVE",
          "name": "Oliver Gray",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "0f471ca5-15c9-405e-a1b9-7cc35194b673",
          "contactStatus": "ACTIVE",
          "name": "Party Hire",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "d0cd2c4f-18a0-4f7c-a32a-2db00f29d298",
          "contactStatus": "ACTIVE",
          "name": "PC Complete",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "9d12a994-9640-4b75-95cc-3de1e9d0ef09",
          "contactStatus": "ACTIVE",
          "name": "Petrie McLoud Watson & Associates",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "ad24c33b-256b-4157-ad56-cbcf0e8db7b1",
          "contactStatus": "ACTIVE",
          "name": "Pinnacle Management",
          "firstName": "Nick",
          "lastName": "Wakefield",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "13cd4c47-baa6-4f07-93f6-6442310df4bf",
          "contactStatus": "ACTIVE",
          "name": "Port Phillip Freight",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "d6851dc2-9ed9-4515-bc0b-810b09c06a6a",
          "contactStatus": "ACTIVE",
          "name": "PowerDirect",
          "firstName": "",
          "lastName": "",
          "emailAddress": "",
          "bankAccountDetails": "345-678-9012345",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "efdb3600-f233-42e2-8f18-ce7e2a95e4b1",
          "contactStatus": "ACTIVE",
          "name": "Princes Highway Motors",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e8b98c13-a424-41d2-ba0e-7b7621411e7a",
          "contactStatus": "ACTIVE",
          "name": "Qantas",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "64eedbc9-1fa0-485a-837f-705f23188161",
          "contactStatus": "ACTIVE",
          "name": "Quantum Consultants",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "6de0b0cf-560c-4503-aab3-e1543c329deb",
          "contactStatus": "ACTIVE",
          "name": "Rex Media Group",
          "emailAddress": "sam@rexmedia.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "158a2667-82ee-43bf-8f33-a6cc9524092d",
          "contactStatus": "ACTIVE",
          "name": "Ridgeway Savings & Loan",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "3878fbf4-7a62-421e-87f7-fbfa577317fb",
          "contactStatus": "ACTIVE",
          "name": "Ridgeway University",
          "firstName": "",
          "lastName": "",
          "emailAddress": "accounts@ridgewayuniversity.edu",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "4e2f192e-8397-4d4d-97ca-a4fc5ac531bf",
          "contactStatus": "ACTIVE",
          "name": "Slug and Lettuce",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "8a154a19-6c6c-404b-bbc9-6deae2d18251",
          "contactStatus": "ACTIVE",
          "name": "SMART Agency",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "565acaa9-e7f3-4fbf-80c3-16b081ddae10",
          "contactStatus": "ACTIVE",
          "name": "Southside Office Supplies",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "eb43fcc6-87ec-4a0a-b243-d718bee4e2cb",
          "contactStatus": "ACTIVE",
          "name": "Stitch a Brand",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "416ab20c-5357-4beb-a740-e8d175d71efb",
          "contactStatus": "ACTIVE",
          "name": "Swanston Security",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "043892a1-aef1-4c18-88d8-b8ccb6d31466",
          "contactStatus": "ACTIVE",
          "name": "Tracy Green",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "78a9d0a0-3d8c-4f84-af3e-f260bf4a9dc0",
          "contactStatus": "ACTIVE",
          "name": "Tramway's Coffe House",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "71d73724-7e0d-4eac-b4c3-f3127c46e788",
          "contactStatus": "ACTIVE",
          "name": "Truxton Property Management",
          "emailAddress": "",
          "bankAccountDetails": "",
          "phones": [],
          "defaultCurrency": "AUD",
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "5d41dafd-eb7e-42c1-bd5a-ba3be1da0960",
          "contactStatus": "ACTIVE",
          "name": "Victoria Property Agency",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "baeed0f3-7989-4874-99b3-59f23032cb73",
          "contactStatus": "ACTIVE",
          "name": "Vodafone",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "e6ca965d-7c48-480e-be39-e847307f474a",
          "contactStatus": "ACTIVE",
          "name": "Woolworths",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:41.980Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "fe61ead1-8afc-4f0b-beda-066620227aad",
          "contactStatus": "ACTIVE",
          "name": "Xero",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.020Z",
          "hasValidationErrors": false
        },
        {
          "contactID": "755f1475-d255-43a8-bedc-5ea7fd26c71f",
          "contactStatus": "ACTIVE",
          "name": "Yarra Transport",
          "emailAddress": "rayong@yarratransport.co",
          "bankAccountDetails": "",
          "phones": [],
          "updatedDateUTC": "2021-07-18T18:03:42.037Z",
          "hasValidationErrors": false
        }
      ]
    });

  }
}
