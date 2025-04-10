CREATE TABLE IF NOT EXISTS taxonomies (
  id SERIAL PRIMARY KEY,
  repo_url TEXT NOT NULL,
  taxon_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  author_orcid TEXT,
  doc_url TEXT,
  purl TEXT,
  h5ad_url TEXT DEFAULT '',
  last_edited TIMESTAMP,
  active BOOL DEFAULT TRUE,
  is_public BOOL DEFAULT TRUE
);

INSERT INTO taxonomies (repo_url, taxon_id, title, description, author_orcid, doc_url, purl, h5ad_url)
VALUES
    (
    'https://github.com/brain-bican/human-brain-cell-atlas_v1_neurons', 
    'CS202210140',
    'Human Brain Cell Atlas v1.0 (Neurons)', 
    'First draft atlas of human brain transcriptomic cell types: The human brain directs a wide range of complex behaviors ranging from fine motor skills to abstract intelligence and emotion. This broad range of functions is supported by an exceptionally complex cellular and circuit architecture. To create a first draft human brain cell atlas, high-throughput single-nucleus RNA sequencing was used to systematically survey cells across the entire adult human brain in three postmortem donors. Over three million nuclei were sampled from approximately 100 dissections across the forebrain, midbrain, and hindbrain. Analysis of these data showed regional diversity in that cellular organization exhibited regional diversity at multiple scales, identifying 30 superclusters, 461 clusters and 3313 subclusters. As the first single-cell transcriptomic census of the entire human brain, this atlas provides a resource for understanding the molecular diversity of the human brain in health and disease. The Human Brain Cell Atlas v1.0 is presented for visualization and data mining through the Chan Zuckerberg Initiative''s CellxGene application, with the following biologically meaningful partitions: 1. Neuronal and non-neuronal cell types 2. Supercluster-specific groupings (''Supercluster: '') 3.Brain region-specific groupings (''Dissection: ''), ordered by the adult human brain anatomical reference atlas ontology in Ding et al. (2016)',
    'https://orcid.org/0000-0001-7620-8973',
    'https://purl.brain-bican.org/taxonomy/CS202210140/CS202210140_neurons/',
    'https://purl.brain-bican.org/taxonomy/CCN202210140/CS202210140_neurons.json',
    'http://cellular-semantics.cog.sanger.ac.uk/public/merged_Siletti_All_neurons.h5ad'
    ),
    (
    'https://github.com/brain-bican/human-brain-cell-atlas_v1_non-neuronal', 
    'CS202210140',
    'Human Brain Cell Atlas v1.0 (Non-neuronal)', 
    'First draft atlas of human brain transcriptomic cell types: The human brain directs a wide range of complex behaviors ranging from fine motor skills to abstract intelligence and emotion. This broad range of functions is supported by an exceptionally complex cellular and circuit architecture. To create a first draft human brain cell atlas, high-throughput single-nucleus RNA sequencing was used to systematically survey cells across the entire adult human brain in three postmortem donors. Over three million nuclei were sampled from approximately 100 dissections across the forebrain, midbrain, and hindbrain. Analysis of these data showed regional diversity in that cellular organization exhibited regional diversity at multiple scales, identifying 30 superclusters, 461 clusters and 3313 subclusters. As the first single-cell transcriptomic census of the entire human brain, this atlas provides a resource for understanding the molecular diversity of the human brain in health and disease. The Human Brain Cell Atlas v1.0 is presented for visualization and data mining through the Chan Zuckerberg Initiative''s CellxGene application, with the following biologically meaningful partitions: 1. Neuronal and non-neuronal cell types 2. Supercluster-specific groupings (''Supercluster: '') 3.Brain region-specific groupings (''Dissection: ''), ordered by the adult human brain anatomical reference atlas ontology in Ding et al. (2016)',
    'https://orcid.org/0000-0001-7620-8973',
    'https://purl.brain-bican.org/taxonomy/CS202210140/CS202210140_non-neuronal/',
    'https://purl.brain-bican.org/taxonomy/CCN202210140/CS202210140_non-neuronal.json',
    'http://cellular-semantics.cog.sanger.ac.uk/public/merged_Siletti_All_non-neuronal.h5ad'
    ),
    (
    'https://github.com/brain-bican/whole_mouse_brain_taxonomy', 
    'CCN20230722',
    'Whole Mouse Brain taxonomy', 
    'Atlas of whole mouse brain.',
    'https://orcid.org/0000-0002-9361-5607',
    'https://purl.brain-bican.org/taxonomy/CCN20230722',
    'https://purl.brain-bican.org/taxonomy/CCN20230722/CCN20230722.json',
    'http://cellular-semantics.cog.sanger.ac.uk/public/merged_CS20230722_CLAS_01.h5ad'
    ),
    (
    'https://github.com/Cellular-Semantics/human-neocortex-non-neuronal-cells', 
    'CCN20240304',
    'Human neocortex non-neuronal cells', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Supercluster: Non-neuronal cells.',
    'https://orcid.org/0000-0003-3373-7386',
    '',
    '',
    ''
    ),
    (
    'https://github.com/Cellular-Semantics/human-neocortex-mge-derived-interneurons', 
    'CCN20240304',
    'Human neocortex MGE-derived interneurons', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Supercluster: MGE-derived interneurons.',
    'https://orcid.org/0000-0003-3373-7386',
    '',
    '',
    ''
    ),
    (
    'https://github.com/Cellular-Semantics/human-neocortex-it-projecting-excitatory-neurons', 
    'CCN20240304',
    'Human neocortex IT-projecting excitatory neurons', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Supercluster: IT-projecting excitatory neurons.',
    'https://orcid.org/0000-0003-3373-7386',
    '',
    '',
    ''
    ),
    (
    'https://github.com/Cellular-Semantics/human-neocortex-deep-layer-excitatory-neurons', 
    'CCN20240304',
    'Human neocortex Deep layer (non-IT) excitatory neurons.', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Supercluster: Deep layer (non-IT) excitatory neurons..',
    'https://orcid.org/0000-0003-3373-7386',
    '',
    '',
    ''
    ),
    (
    'https://github.com/Cellular-Semantics/human-neocortex-cge-derived-interneurons', 
    'CCN20240304',
    'Human neocortex CGE-derived interneurons', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Supercluster: CGE-derived interneurons.',
    'https://orcid.org/0000-0003-3373-7386',
    '',
    '',
    ''
    ),
    (
    'https://github.com/brain-bican/human-neocortex-middle-temporal-gyrus', 
    'AIT_MTG',
    'Human neocortex Middle Temporal Gyrus', 
    'Cellular and molecular characterization of human cortical cytoarchitecture. Dissection: Middle temporal gyrus (MTG).',
    'https://orcid.org/0000-0003-3373-7386',
    'https://purl.brain-bican.org/taxonomy/AIT_MTG',
    'https://purl.brain-bican.org/taxonomy/AIT_MTG/AIT_MTG.json',
    'http://cellular-semantics.cog.sanger.ac.uk/public/AIT_MTG.h5ad'
    ),
    (
    'https://github.com/brain-bican/basal_ganglia_macaque_taxonomy', 
    'AIT119',
    'Basal Ganglia taxonomy (Macaque)', 
    'Atlas of Macaque basal ganglia, developed in collaboration with the BRAIN Initiative Cell Census Network (BICCN).',
    'https://orcid.org/0000-0002-4436-969X',
    'https://purl.brain-bican.org/taxonomy/AIT119',
    'https://purl.brain-bican.org/taxonomy/AIT119/AIT119.json',
    'https://hmba-macaque-wg-802451596237-us-west-2.s3.us-west-2.amazonaws.com/Aim1_Atlases/BasalGanglia/Macaque_basalganglia_HMBA_AIT11-9_anno_latest.h5ad'
    ),
    (
    'https://github.com/brain-bican/basal_ganglia_human_taxonomy', 
    'AIT195',
    'Basal Ganglia taxonomy (Human)', 
    'Atlas of Human basal ganglia, developed in collaboration with the BRAIN Initiative Cell Census Network (BICCN).',
    'https://orcid.org/0000-0002-4436-969X',
    'https://purl.brain-bican.org/taxonomy/AIT195',
    'https://purl.brain-bican.org/taxonomy/AIT195/AIT195.json',
    'https://hmba-human-wg-802451596237-us-west-2.s3.us-west-2.amazonaws.com/Aim1_Atlases/BasalGanglia/Human_basalganglia_HMBA_AIT19-5_anno_latest.h5ad'
    );