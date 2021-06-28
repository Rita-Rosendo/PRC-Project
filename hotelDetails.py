#!/usr/bin/python3
import csv
import re

file_hoteis = open("hoteisDetails2.ttl","w")

hoteisID = []
with open('hotelDetails.csv', 'r') as ficheiro:
    data = csv.reader(ficheiro, delimiter=',')
    next(data)
    for row in data:
        if row[1] not in hoteisID:
            hoteisID.append(row[1])
            file_hoteis.write('###  http://www.semanticweb.org/aninhas/ontologies/hoteis#hotel_' + row[1] + '\n')
            file_hoteis.write(':hotel_'+ row[1] +' rdf:type owl:NamedIndividual ,\n')
            file_hoteis.write('\t\t\t:Hotel ;\n')
            if row[2] != "":
                file_hoteis.write('\t:name "'+ row[2].replace('"','') +'" ;\n')
            if row[3] != "":
                info = re.sub(r'[\\]','',row[3].replace('"',''))
                file_hoteis.write('\t:address "'+ info +'" ;\n')
            if row[4] != "":
                file_hoteis.write('\t:city "'+ row[4].replace('"',"") +'" ;\n')
            if row[5] != "":
                file_hoteis.write('\t:country "'+ row[5].replace('"',"") +'" ;\n')
            if row[6] != "":
                file_hoteis.write('\t:zip_code '+ row[6] +' ;\n')
            if row[7] != "":
                file_hoteis.write('\t:property_type "'+ row[7].replace('"',"") +'" ;\n')
            if row[8] != "":
                file_hoteis.write('\t:star_rating '+ row[8] +' ;\n')
            if row[9] != "":
                file_hoteis.write('\t:latitude '+ row[9] +' ;\n')
            if row[10] != "":
                file_hoteis.write('\t:longitude '+ row[10] +' ;\n')
            if row[12] != "":
                file_hoteis.write('\t:url "'+ row[12] +'" ;\n')
            file_hoteis.write('.\n\n\n')
print(len(hoteisID))

file_hoteis.close()