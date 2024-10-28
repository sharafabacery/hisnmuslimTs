SELECT t.id,t.name,t.search,c.content,c.fadl,c.source,c.hokm,c.search
FROM titles t
INNER JOIN contents c
ON t.id=c.titleId
order by t.id,c.order